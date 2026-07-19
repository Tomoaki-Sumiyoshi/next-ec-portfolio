package orders

import (
	"context"
	"database/sql"
	"errors"
	"net/mail"
	"regexp"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
	"github.com/t-sumiyoshi/next-ec-portfolio/apps/api/lib/db"
	"github.com/t-sumiyoshi/next-ec-portfolio/apps/api/lib/openapi"
)

const queryTimeout = 3 * time.Second

var (
	ErrInvalidInput = errors.New("invalid order input")
	postCodePattern = regexp.MustCompile(`^[0-9]{3}-[0-9]{4}$`)
)

func List(ctx context.Context, userID uuid.UUID) ([]openapi.Order, error) {
	return query(ctx, `WHERE o.user_id = $1`, userID)
}

func ListByID(ctx context.Context, orderID uuid.UUID) ([]openapi.Order, error) {
	return query(ctx, `WHERE o.id = $1`, orderID)
}

func Create(ctx context.Context, request openapi.CreateOrderRequest) (openapi.Order, error) {
	if err := validateCreateRequest(request); err != nil {
		return openapi.Order{}, err
	}

	conn, err := db.DB()
	if err != nil {
		return openapi.Order{}, err
	}

	ctx, cancel := context.WithTimeout(ctx, queryTimeout)
	defer cancel()

	tx, err := conn.BeginTx(ctx, nil)
	if err != nil {
		return openapi.Order{}, err
	}
	defer tx.Rollback()

	createdOrder := openapi.Order{
		CreatedAt:       time.Now().UTC(),
		Customer:        request.Customer,
		Id:              uuid.New(),
		ItemList:        request.ItemList,
		ShippingAddress: request.ShippingAddress,
		UserId:          request.UserId,
	}

	_, err = tx.ExecContext(ctx, `
		INSERT INTO orders (
			id, user_id, full_name, email, post_code,
			address_line1, address_line2, created_at
		)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
	`,
		createdOrder.Id,
		createdOrder.UserId,
		createdOrder.Customer.FullName,
		createdOrder.Customer.Email,
		createdOrder.ShippingAddress.PostCode,
		createdOrder.ShippingAddress.AddressLine1,
		createdOrder.ShippingAddress.AddressLine2,
		createdOrder.CreatedAt,
	)
	if err != nil {
		return openapi.Order{}, err
	}

	for _, item := range createdOrder.ItemList {
		_, err = tx.ExecContext(ctx, `
			INSERT INTO order_items (
				order_id, product_id, quantity, market_price
			)
			VALUES ($1, $2, $3, $4)
		`, createdOrder.Id, item.ProductId, item.Quantity, item.MarketPrice)
		if err != nil {
			var pqErr *pq.Error
			if errors.As(err, &pqErr) && pqErr.Code.Class() == "23" {
				return openapi.Order{}, ErrInvalidInput
			}
			return openapi.Order{}, err
		}
	}

	if err := tx.Commit(); err != nil {
		return openapi.Order{}, err
	}

	return createdOrder, nil
}

func query(ctx context.Context, whereClause string, arg any) ([]openapi.Order, error) {
	conn, err := db.DB()
	if err != nil {
		return nil, err
	}

	ctx, cancel := context.WithTimeout(ctx, queryTimeout)
	defer cancel()

	rows, err := conn.QueryContext(ctx, `
		SELECT
			o.id,
			o.user_id,
			o.full_name,
			o.email,
			o.post_code,
			o.address_line1,
			o.address_line2,
			o.created_at,
			oi.product_id,
			oi.quantity,
			oi.market_price
		FROM orders o
		JOIN order_items oi ON oi.order_id = o.id
		`+whereClause+`
		ORDER BY o.created_at DESC, o.id, oi.product_id
	`, arg)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	result := []openapi.Order{}
	orderIndexes := map[uuid.UUID]int{}
	for rows.Next() {
		var (
			order        openapi.Order
			item         openapi.OrderItem
			addressLine2 sql.NullString
		)

		if err := rows.Scan(
			&order.Id,
			&order.UserId,
			&order.Customer.FullName,
			&order.Customer.Email,
			&order.ShippingAddress.PostCode,
			&order.ShippingAddress.AddressLine1,
			&addressLine2,
			&order.CreatedAt,
			&item.ProductId,
			&item.Quantity,
			&item.MarketPrice,
		); err != nil {
			return nil, err
		}

		if addressLine2.Valid {
			order.ShippingAddress.AddressLine2 = &addressLine2.String
		}

		index, exists := orderIndexes[order.Id]
		if !exists {
			order.ItemList = []openapi.OrderItem{}
			result = append(result, order)
			index = len(result) - 1
			orderIndexes[order.Id] = index
		}
		result[index].ItemList = append(result[index].ItemList, item)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return result, nil
}

func validateCreateRequest(request openapi.CreateOrderRequest) error {
	if len([]rune(request.Customer.FullName)) < 2 || len(request.ItemList) == 0 {
		return ErrInvalidInput
	}

	emailAddress, err := mail.ParseAddress(string(request.Customer.Email))
	if err != nil || emailAddress.Address != string(request.Customer.Email) {
		return ErrInvalidInput
	}

	if !postCodePattern.MatchString(request.ShippingAddress.PostCode) {
		return ErrInvalidInput
	}

	for _, item := range request.ItemList {
		if strings.TrimSpace(item.ProductId) == "" || item.Quantity < 1 || item.MarketPrice < 0 {
			return ErrInvalidInput
		}
	}

	return nil
}
