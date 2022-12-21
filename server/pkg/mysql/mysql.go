package mysql

import (
	"fmt"
	"os"

	//"gorm.io/driver/mysql"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

// Connection Database
func DatabaseInit() {
	var err error
	//dsn := "root:@tcp(127.0.0.1:3306)/waysbucks?charset=utf8mb4&parseTime=True&loc=Local"
	var DB_HOST = os.Getenv("DB_HOST")
	var DB_USER = os.Getenv("DB_USER")
	var DB_PASSWORD = os.Getenv("DB_PASSWORD")
	var DB_NAME = os.Getenv("DB_NAME")
	var DB_PORT = os.Getenv("DB_PORT")

	//dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME)
  //dsn := "root:eIoIW3ErHby3rxGFR9vK@tcp(containers-us-west-146.railway.app:6648)/railway?charset=utf8mb4&parseTime=True&loc=Local"
  
	//DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s", DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT)
DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	
	if err != nil {
		panic(err)
	}

	fmt.Println("Connected to Database")
}
