package models

type Transaction struct {
	ID      int64        `json:"id" gorm:"primary_key:auto_increment"`
	UserID  int          `json:"user_id" gorm:"type:int"`
	User    UserResponse `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Status  string       `json:"status" gorm:"type:varchar(25)"`
	Order   []Order      `json:"orders"`
	Total   int          `json:"total" gorm:"type:int"`
	Phone   string       `json:"phone" form:"phone" gorm:"type:varchar(255)"`
	Postcode string       `json:"postcode" form:"poscode" gorm:"type:varchar(255)"`
	Address string       `json:"address" form:"address" gorm:"type:varchar(255)"`
}

type TransResponse struct {
	ID     int `json:"id"`
	UserID int `json:"user_id"`
}

func (TransResponse) TableName() string {
	return "transactions"
}
