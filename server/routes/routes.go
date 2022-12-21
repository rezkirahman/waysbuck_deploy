package routes

import (
	"github.com/gorilla/mux"
)

func RouteInit(r *mux.Router) {
	OrderRoutes(r)
	UserRoutes(r)
	ProductRoutes(r) // Add this code
	ToppingRoutes(r)
	AuthRoutes(r)
	TransactionRoutes(r)
}
