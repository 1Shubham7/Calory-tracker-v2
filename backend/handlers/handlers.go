package routes

import (
	"context"
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var ourCollection *mongo.Collection = openCollection(Client, "calories")
// we will get the calory collection in the var ourCollection

// GET request handlers

func GetFoodEntry(c *gin.Context){ //using gin, you don't have to specifically write the http.Request and http.responseWrite we rather you c gin.context
	var ctx, cancel = context.WithTimeout(context.Background(), 100 *time.Seconds)

	var entries []bson.M //this is a slice of type bson.M

	cursor, err := entryCollection.Find(ctx, bson.M{}) // this will find everything
	// and anytime you run a database collection or function, run an error handler

	if err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error" : err.Error()})
		fmt.Println(err)
		return
	}
}

func GetAllFoodEntries(c *gin.Context) {
	
}

func GetFoodEntryByIngredient(){

}

// POST request handlers 

func AddFoodEntry(){

}

// PUT request handlers

func UpdateFoodEntry(){

}

func UpdateFoodEntryByEngredient() {

}

// DELETE request handlers

func DeleteFoodEntry(c *gin.Context){
	id := c.Params.ByName("id")
	docId, _ := primitive.ObjectIDFromHex(id) 

	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	// just the timeout one

	result, err := ourCollection.DeleteOne(context, bson.M{"_id": docId})
	// delete the id or docId and store the result in the result collection
	
	if err != nil{
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		fmt.Println(err)
		return
	}

	defer cancel()
	c.JSON(http.StatusOK, result.DeletedCount)
}