package toppingdto

type CreateToppingRequest struct {
	Name  string `json:"name" form:"name" gorm:"type: varchar(255)"`
	Price int    `json:"price" form:"price" gorm:"type: int"`
	Image string `json:"image" form:"image" gorm:"type: varchar(255)"`
	Qty   int    `json:"qty" form:"qty" gorm:"type: int"`
}

type UpdateToppingRequest struct {
	Name  string `json:"name" form:"name"`
	Price int    `json:"price" form:"price"`
	Image string `json:"image" form:"image"`
	Qty   int    `json:"qty" form:"qty"`
}

type ToppingResponse struct {
	ID    int    `json:"id"`
	Name string `json:"title" form:"title"`
	Price int    `json:"price" form:"price"`
	Image string `json:"image" form:"image"`
	Qty   int    `json:"qty" form:"qty"`
}
