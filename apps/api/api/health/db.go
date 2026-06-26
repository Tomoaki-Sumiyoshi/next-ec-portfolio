package handler

import (
	"log"
	"net/http"

	"github.com/t-sumiyoshi/next-ec-portfolio/apps/api/lib/db"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.Header().Set("Allow", http.MethodGet)
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	if err := db.Ping(r.Context()); err != nil {
		log.Printf("db health check failed: %v", err)
		http.Error(w, "db unavailable", http.StatusServiceUnavailable)
		return
	}

	w.WriteHeader(http.StatusOK)
}