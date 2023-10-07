package main

import (
	"os"
	"github.com/1shubham7/caltech/handlers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	router := gin.New()
	router.Use(gin.Logger())
	router.Use(cors.Default())

	router.POST("/entry/create", handlers.AddEntry)
	router.GET("/entries", handlers.GetEntries)
	router.GET("/entry/:id/", handlers.GetEntryById)
	router.GET("/ingredient/:ingredient", handlers.GetEntriesByIngredient)

	router.PUT("/entry/update/:id", handlers.UpdateEntry)
	router.PUT("/ingredient/update/:id", handlers.UpdateIngredient)
	router.DELETE("/entry/delete/:id", handlers.DeleteEntry)
	router.Run(":" + port)
}
