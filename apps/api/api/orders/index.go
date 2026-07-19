package handler

import (
	"encoding/json"
	"errors"
	"io"
	"log"
	"net/http"

	"github.com/google/uuid"
	"github.com/t-sumiyoshi/next-ec-portfolio/apps/api/lib/openapi"
	"github.com/t-sumiyoshi/next-ec-portfolio/apps/api/lib/orders"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		list(w, r)
	case http.MethodPost:
		create(w, r)
	default:
		w.Header().Set("Allow", http.MethodGet+", "+http.MethodPost)
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
	}
}

func list(w http.ResponseWriter, r *http.Request) {
	userIDRaw := r.URL.Query().Get("userId")
	orderIDRaw := r.URL.Query().Get("id")
	if (userIDRaw == "") == (orderIDRaw == "") {
		http.Error(w, "specify either userId or id", http.StatusBadRequest)
		return
	}

	var (
		result []openapi.Order
		err    error
	)
	if userIDRaw != "" {
		userID, parseErr := uuid.Parse(userIDRaw)
		if parseErr != nil {
			http.Error(w, "invalid user ID", http.StatusBadRequest)
			return
		}
		result, err = orders.List(r.Context(), userID)
	} else {
		orderID, parseErr := uuid.Parse(orderIDRaw)
		if parseErr != nil {
			http.Error(w, "invalid order ID", http.StatusBadRequest)
			return
		}
		result, err = orders.ListByID(r.Context(), orderID)
	}

	if err != nil {
		log.Printf("list orders failed: %v", err)
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusOK, result)
}

func create(w http.ResponseWriter, r *http.Request) {
	var request openapi.CreateOrderRequest
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	if err := decoder.Decode(&request); err != nil {
		http.Error(w, "invalid order request", http.StatusBadRequest)
		return
	}
	if err := decoder.Decode(&struct{}{}); !errors.Is(err, io.EOF) {
		http.Error(w, "invalid order request", http.StatusBadRequest)
		return
	}

	createdOrder, err := orders.Create(r.Context(), request)
	if errors.Is(err, orders.ErrInvalidInput) {
		http.Error(w, "invalid order request", http.StatusBadRequest)
		return
	}
	if err != nil {
		log.Printf("create order failed: %v", err)
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusCreated, createdOrder)
}

func writeJSON(w http.ResponseWriter, status int, value any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(value); err != nil {
		log.Printf("encode orders response failed: %v", err)
	}
}
