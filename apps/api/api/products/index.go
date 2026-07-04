package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"github.com/t-sumiyoshi/next-ec-portfolio/apps/api/lib/products"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.Header().Set("Allow", http.MethodGet)
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	ids := parseIDs(r.URL.Query().Get("ids"))

	result, err := products.List(r.Context(), ids)
	if err != nil {
		log.Printf("list products failed: %v", err)
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(result); err != nil {
		log.Printf("encode products response failed: %v", err)
	}
}

func parseIDs(raw string) []string {
	if raw == "" {
		return nil
	}

	parts := strings.Split(raw, ",")
	ids := make([]string, 0, len(parts))
	for _, part := range parts {
		id := strings.TrimSpace(part)
		if id != "" {
			ids = append(ids, id)
		}
	}

	return ids
}
