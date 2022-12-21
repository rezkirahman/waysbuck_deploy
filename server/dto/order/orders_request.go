package orderdto

type CreateOrderRequest struct {
	ID        int   `json:"id"`
	Subtotal  int   `json:"sub_total"`
	UserID    int   `json:"user_id"`
	ProductID int   `json:"product_id"`
	ToppingID []int `json:"topping_id"`
	Qty       int   `json:"qty"`
}

type UpdateOrderRequest struct {
	Qty       int `json:"qty"`
}
