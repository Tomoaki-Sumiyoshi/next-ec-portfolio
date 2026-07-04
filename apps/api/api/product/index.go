package handler

import (
	"database/sql"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"net/url"
	"strings"

	"github.com/t-sumiyoshi/next-ec-portfolio/apps/api/lib/products"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.Header().Set("Allow", http.MethodGet)
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	productID, err := productIDFromRequest(r)
	if err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}

	product, err := products.GetByID(r.Context(), productID)
	if errors.Is(err, sql.ErrNoRows) {
		http.Error(w, "product not found", http.StatusNotFound)
		return
	}

	if err != nil {
		log.Printf("get product failed: %v", err)
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(product); err != nil {
		log.Printf("encode product response failed: %v", err)
	}
}

func productIDFromRequest(r *http.Request) (string, error) {
	if id := strings.TrimSpace(r.URL.Query().Get("productId")); id != "" {
		return id, nil
	}

	parts := strings.Split(strings.Trim(r.URL.Path, "/"), "/")
	if len(parts) == 0 {
		return "", http.ErrMissingFile
	}

	id, err := url.PathUnescape(parts[len(parts)-1])
	if err != nil {
		return "", err
	}

	if strings.TrimSpace(id) == "" {
		return "", http.ErrMissingFile
	}

	return id, nil
}
