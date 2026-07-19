package handler

import (
	"crypto/subtle"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/t-sumiyoshi/next-ec-portfolio/apps/api/lib/orders"
)

const orderRetention = 24 * time.Hour

func Handler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.Header().Set("Allow", http.MethodGet)
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	cronSecret := os.Getenv("CRON_SECRET")
	if cronSecret == "" {
		log.Print("orders cleanup failed: CRON_SECRET is not defined")
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	expectedAuthorization := "Bearer " + cronSecret
	if subtle.ConstantTimeCompare(
		[]byte(r.Header.Get("Authorization")),
		[]byte(expectedAuthorization),
	) != 1 {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	cutoff := time.Now().UTC().Add(-orderRetention)
	deletedOrders, err := orders.DeleteCreatedBefore(r.Context(), cutoff)
	if err != nil {
		log.Printf("orders cleanup failed: %v", err)
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	log.Printf(
		"orders cleanup completed: deleted_orders=%d cutoff=%s",
		deletedOrders,
		cutoff.Format(time.RFC3339),
	)

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(map[string]int64{
		"deletedOrders": deletedOrders,
	}); err != nil {
		log.Printf("encode orders cleanup response failed: %v", err)
	}
}
