package orders

import (
	"context"
	"time"

	"github.com/t-sumiyoshi/next-ec-portfolio/apps/api/lib/db"
)

func DeleteCreatedBefore(ctx context.Context, cutoff time.Time) (int64, error) {
	conn, err := db.DB()
	if err != nil {
		return 0, err
	}

	ctx, cancel := context.WithTimeout(ctx, queryTimeout)
	defer cancel()

	result, err := conn.ExecContext(ctx, `
		DELETE FROM orders
		WHERE created_at < $1
	`, cutoff)
	if err != nil {
		return 0, err
	}

	return result.RowsAffected()
}
