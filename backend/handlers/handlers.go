package handlers

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/1shubham7/caltech/models"
	"github.com/gin-gonic/gin"
	"go.modules.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"gopkg.in/mgo.v2/bson"
)

var ourCollection *mongo.Collection = OpenCollection(Client, "calories")
// we will get the calory collection in the var ourCollection

// GET request handlers

func GetFoodEntry(c *gin.Context){ //using gin, you don't have to specifically write the http.Request and http.responseWrite we rather you c gin.context
	EntryID := c.Params.ByName("id")
	docID, _ := primitive.ObjectIDFromHex(EntryID) //primitive package helps us with ids
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	var entry bson.M
	if err := ourCollection.FindOne(ctx, bson.M{"_id": docID}).Decode(&entry); err != nil {
		c.JSON(http.StatusInternalServerError,  gin.H{"error": err.Error()})
		fmt.Println(err)
		return
	}
	defer cancel()
	fmt.Println(entry)
	c.JSON(http.StatusOK, entry)
}

func GetAllFoodEntries(c *gin.Context) {

	var ctx, cancel = context.WithTimeout(context.Background(), 100 *time.Second)
	var entries []bson.M //this is a slice of type bson.M

	cursor, err := ourCollection.Find(ctx, bson.M{}) // this will find everything
	// and anytime you run a database collection or function, run an error handler

	if err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error" : err.Error()})
		fmt.Println(err)
		return
	}

	// now we get raw data from find function, bringing it to entries
	if err = cursor.All(ctx, &entries); err !=nil{
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		fmt.Println(err)
		return
	}
	defer cancel()
	fmt.Println(entries)
	c.JSON(http.StatusOK, entries)
}
	

func GetFoodEntryByIngredient(c *gin.Context){
	ingredient := c.Params.ByName("id")
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	var entries []bson.M
	cursor, err := ourCollection.Find(ctx, bson.M{"ingredient": ingredient})
	if err != nil{
		c.JSON(http.StatusInternalServerError, gin.H{"error" : err.Error()})
		fmt.Println(err)
		return
	}
	if err = cursor.All(ctx, &entries); err != nil{
		c.JSON(http.StatusInternalServerError, gin.H{"error" : err.Error()})
		fmt.Println(err)
		return
	}
	defer cancel()
	fmt.Println(entries)

	c.JSON(http.StatusOK, entries)
}

// POST request handlers 

func AddFoodEntry(c *gin.Context){
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	var entry models.Food
	if err := c.BindJSON(&entry); err!= nil{ //this will bind mongo data to something that go understands
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		fmt.Println(err)
		return
	}
	validationErr := validate.Struct(entry)
	if validationErr != nil {	
		c.JSON(http.StatusInternalServerError, gin.H{"error": validationErr.Error()})
		fmt.Println(validationErr)
		return
	}
	entry.ID = primitive.NewObjectID() //adding an id to the object
	result, insertErr := ourCollection.InsertOne(ctx, entry)

	if insertErr != nil {
		errMsg := fmt.Sprintf("order item was not created")
		c.JSON(http.StatusInternalServerError, gin.H{"error": errMsg})
		fmt.Println(insertErr)
		return
	}
	defer cancel()
	c.JSON(http.StatusOK, result)
}

// PUT request handlers

func UpdateFoodEntry(c gin.Context){
	entryID := c.Params.ByName("id")
	docID, _ := primitive.ObjectIDFromHex(entryID)
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	var entry models.Food
	if err := c.BindJSON(&entry); err!= nil{ 
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		fmt.Println(err)
		return
	}
	validationErr := validate.Struct(entry)
	if validationErr != nil {	
		c.JSON(http.StatusInternalServerError, gin.H{"error": validationErr.Error()})
		fmt.Println(validationErr)
		return
	}
	result, err:= ourCollection.ReplaceOne(
		ctx,
		bson.M{"_id":docID},
		bson.M{
			"food": entry.Food,
			"fat": entry.Fat,
			"calories": entry.Calories,
			"ingredients": entry.Ingredients,
		},
	)
	if err != nil{
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		fmt.Println(err)
		return
	}
	defer cancel()
	c.JSON(http.StatusOK, result.ModifiedCount)

}

func UpdateFoodEntryByEngredient(c *gin.Context) {
	entryID := c.Params.ByName("id")
	docID, _ := primitive.ObjectIDFromHex(entryID)
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	type Ingredient struct{
		Ingredients *string `json:"ingredients`
	}

	var ingredient Ingredient
	if err := c.BindJSON(&ingredient); err!= nil{ 
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		fmt.Println(err)
		return
	}
	result, err := ourCollection.UpdateOne(ctx, bson.M{"_id":docID},
	bson.D{{"$set",bson.D{{"ingredients": ingredient.Ingredients}}}},
	)

	if err != nil{
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		fmt.Println(err)
		return

	}
	defer cancel()
	c.JSON(http.StatusOK, result.ModifiedCount)
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