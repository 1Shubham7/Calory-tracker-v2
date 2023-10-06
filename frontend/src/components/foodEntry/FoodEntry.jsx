import React, {useState, useEffect} from 'react'
import {Button, Card, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'


    const Entry = ({entryData, setChangeIngredient, deleteSingleEntry, setChangeEntry}) => {
        // the struct we created in backend , all the data from there will come to foodEntry
        return (
            <Card>
                <Row>
                    <Col>
                    <Col>Food: {entryData !== undefined && entryData.food}</Col> #making sure that entryData is not undefined
                    <Col>Fat: {entryData !== undefined && entryData.fat}</Col>
                    <Col>Calories: {entryData !== undefined && entryData.calories}</Col>
                    <Col>Ingredients: {entryData !== undefined && entryData.ingredients}</Col>
                    <Col><Button onClick={()=> deleteSingleEntry(entryData._id)}>Delete entry</Button></Col>
                    <Col><Button onClick={()=> changeIngredient()}>Change Ingredients</Button></Col>
                    <Col><Button onClick={()=> changeEntry()}>Change entry</Button></Col>
                    </Col>
                </Row>
              
            </Card>
          )


          function changeIngredient(){
            setChangeIngredient(
                {
                    "change": true,
                    "id":entryData._id
                }
            )
        }
    
        function changeEntry(){
            setChangeEntry(
                {
                    "change":true,
                    "id":entryData._id
                }
            )
        }
    }
    
export default Entry
