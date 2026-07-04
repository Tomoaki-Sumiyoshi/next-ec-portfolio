package products

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"github.com/lib/pq"
	"github.com/t-sumiyoshi/next-ec-portfolio/apps/api/lib/db"
	"github.com/t-sumiyoshi/next-ec-portfolio/apps/api/lib/openapi"
)

func List(ctx context.Context, ids []string) ([]openapi.Product, error) {
	conn, err := db.DB()
	if err != nil {
		return nil, err
	}

	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	query := `
		SELECT id, name, price, image_url, description
		FROM products
	`
	args := []any{}

	if len(ids) > 0 {
		query += ` WHERE id = ANY($1)`
		args = append(args, pq.Array(ids))
	}

	query += ` ORDER BY id`

	rows, err := conn.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	result := []openapi.Product{}
	for rows.Next() {
		var p openapi.Product
		if err := rows.Scan(&p.Id, &p.Name, &p.Price, &p.ImageUrl, &p.Description); err != nil {
			return nil, err
		}
		result = append(result, p)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return result, nil
}

func GetByID(ctx context.Context, id string) (openapi.Product, error) {
	conn, err := db.DB()
	if err != nil {
		return openapi.Product{}, err
	}

	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	var p openapi.Product
	err = conn.QueryRowContext(ctx, `
		SELECT id, name, price, image_url, description
		FROM products
		WHERE id = $1
	`, id).Scan(&p.Id, &p.Name, &p.Price, &p.ImageUrl, &p.Description)

	if errors.Is(err, sql.ErrNoRows) {
		return openapi.Product{}, sql.ErrNoRows
	}

	if err != nil {
		return openapi.Product{}, err
	}

	return p, nil
}
