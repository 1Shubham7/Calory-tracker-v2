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