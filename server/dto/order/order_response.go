package orderdto

type OrderResponse struct {
	ID       int `json:"id"`
	Qty      int `json:"qty"`
	SubTotal int `json:"subtotal"`
}