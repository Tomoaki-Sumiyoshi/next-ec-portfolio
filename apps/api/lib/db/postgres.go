package db

import (
	"context"
	"database/sql"
	"log"
	"os"
	"sync"
	"time"

	_ "github.com/lib/pq"
)

var (
	db   *sql.DB
	once sync.Once
	err  error
)

func DB() (*sql.DB, error) {
	once.Do(func() {
		dataSourceName := os.Getenv("DATABASE_URL")
		log.Println(dataSourceName)

		db, err = sql.Open("postgres", dataSourceName)
		if err != nil {
			return
		}

		db.SetMaxOpenConns(5)
		db.SetMaxIdleConns(5)
		db.SetConnMaxLifetime(5 * time.Minute)
	})

	return db, err
}

func Ping(ctx context.Context) error {
	conn, err := DB()
	if err != nil {
		return err
	}

	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	return conn.PingContext(ctx)
}