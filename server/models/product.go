package models

type Product struct {
	ID    int    `json:"id" gorm:"primary_key:auto_increment"`
	Name  string `json:"name" form:"name" gorm:"type:varchar(255)"`
	Price int    `json:"price" form:"price" gorm:"type:int"`
	Image string `json:"image" form:"image" gorm:"type:varchar(255)"`
	Qty   int    `json:"-" form:"qty" gorm:"type: int"`
}

type ProductOrder struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Price int    `json:"price"`
	Image string `json:"image"`
}

func (ProductOrder) TableName() string {
	return "products"
}
