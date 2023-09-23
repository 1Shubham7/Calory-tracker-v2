package handlers

import (
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
	"context"
	"time"
	"fmt"
)

func DBinstance() *mongo.Client{ //CLient is a struct. and mongo.Client means there is a Client stuck in Mongodb package
	// in this function we are creating a client struct and returning it
	MongoDb := "mongodb://localhost:27017/caltechdb"
	client, err := mongo.NewClient(options.Client().ApplyURI(MongoDb))
	if err != nil{
		log.Fatal(err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	if err != nil{
		log.Fatal(err)
	}
	fmt.Println("Connected to the MongoDB Database")
	return client
}

var Client *mongo.Client = DBinstance()
//  this is what we are using in the handlers.go 11th line

func OpenCollection(client *mongo.Client, collectionName string) *mongo.Collection { //this funciton is being used by the handler.go line 11
	var collection *mongo.Collection = client.Database("caltechdb").Collection(collectionName)
	return collection
}