package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/1shubham7/caltech/handlers"
)

func main(){
	
	router := gin.New()
	router.Use(gin.Logger())
	router.Use(cors.Default())

	// GET
	router.GET("/food/:id", handlers.GetFoodEntry)
	router.GET("/allfood/", handlers.GetAllFoodEntries)
	router.GET("/ingredient/:ingredient", handlers.GetFoodEntryByIngredient)

	// POST
	router.POST("/food/create", handlers.AddFoodEntry)

	// PUT
	router.PUT("/food/update/:id", handlers.UpdateFoodEntry)
	router.PUT("/ingredient/update/:id, handlers.UpdateFoodEntryByEngredient")

	// DELETE
	router.DELETE("/food/delete/:id", handlers.DeleteFoodEntry)

	router.Run(":6000")
}