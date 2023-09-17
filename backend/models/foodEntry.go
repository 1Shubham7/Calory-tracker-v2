package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Food struct {
	ID primitive.ObjectID `bosn:"id"`
	Food *string `json:"food"`
	Fat *float64 `json:"fat"`
	Calories *int `json:"calories"`
	Ingredients *string `json:"ingredients"`
}