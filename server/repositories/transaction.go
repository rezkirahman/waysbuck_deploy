package repositories

import (
	"waysbucks/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTransactions() ([]models.Transaction, error)
	GetTransaction() (models.Transaction, error)
	CreateTransaction(transaction models.Transaction) (models.Transaction, error)
	UpdateTransaction(transaction models.Transaction) (models.Transaction, error)
	DeleteTransaction(transaction models.Transaction) (models.Transaction, error)
	GetUserTransaction(ID int) ([]models.Transaction, error)
	UpdateTransactions(status string, ID string) error
	GetOneTransaction(ID string) (models.Transaction, error) // Declare GetOneTransaction repository method ...
	GetDetailTransaction(ID int) (models.Transaction, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTransactions() ([]models.Transaction, error) {
	var transaction []models.Transaction
	err := r.db.Preload("User").Preload("Order").Preload("Order.Product").Preload("Order.Topping").Not("status = ?", "waiting").Find(&transaction).Error
	return transaction, err
}

func (r *repository) GetDetailTransaction(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("User").Preload("Orders").Preload("Orders.Product").Preload("Orders.Topping").Find(&transaction, ID).Error

	return transaction, err
}

func (r *repository) GetTransaction() (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("User").Preload("Order").Preload("Order.Product").Preload("Order.Topping").Find(&transaction, "status = ?", "waiting").Error

	return transaction, err
}

func (r *repository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Create(&transaction).Error

	return transaction, err
}

func (r *repository) UpdateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Save(&transaction).Error

	return transaction, err
}

func (r *repository) DeleteTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Delete(&transaction).Error

	return transaction, err
}

func (r *repository) GetUserTransaction(UserID int) ([]models.Transaction, error) {
	var user []models.Transaction
	err := r.db.Debug().Preload("User").Preload("Order").Preload("Order.Product").Preload("Order.Topping").Find(&user, "user_id  = ?", UserID).Error

	return user, err
}

func (r *repository) UpdateTransactions(status string, ID string) error {
	var transaction models.Transaction
	r.db.Preload("Product").First(&transaction, ID)

	// If is different & Status is "success" decrement product quantity
	if status != transaction.Status && status == "success" {
		var product models.Product
		r.db.First(&product, transaction.ID)
	}

	transaction.Status = status

	err := r.db.Save(&transaction).Error

	return err
}

// GetOneTransaction
func (r *repository) GetOneTransaction(ID string) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("Order").Preload("Order.Product").Preload("Order.Topping").Preload("User").First(&transaction, "id = ?", ID).Error

	return transaction, err
}


