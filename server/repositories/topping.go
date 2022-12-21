package repositories

import (
	"waysbucks/models"

	"gorm.io/gorm"
)

type ToppingRepository interface {
	FindToppings() ([]models.Topping, error)
	GetTopping(ID int) (models.Topping, error)
	CreateTopping(topping models.Topping) (models.Topping, error)
	UpdateTopping(product models.Topping) (models.Topping, error)
	DeleteTopping(product models.Topping) (models.Topping, error)
}

func RepositoryTopping(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindToppings() ([]models.Topping, error) {
	var toppings []models.Topping
	err := r.db.Find(&toppings).Error // add this code

	return toppings, err
}

func (r *repository) GetTopping(ID int) (models.Topping, error) {
	var topping models.Topping
	// not yet using category relation, cause this step doesnt Belong to Many
	err := r.db.Debug().First(&topping, ID).Error

	return topping, err
}

func (r *repository) CreateTopping(topping models.Topping) (models.Topping, error) {
	err := r.db.Debug().Create(&topping).Error

	return topping, err
}

func (r *repository) UpdateTopping(product models.Topping) (models.Topping, error) {
	err := r.db.Save(&product).Error

	return product, err
}

func (r *repository) DeleteTopping(topping models.Topping) (models.Topping, error) {
	err := r.db.Delete(&topping).Error

	return topping, err
}
