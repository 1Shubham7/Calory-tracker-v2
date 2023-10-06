import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Entry from './FoodEntry'
import {Button, Form, Container, Modal} from 'react-bootstrap'

const Entries =() => {

  const [entries, setEntries] = useState([])
  const [refreshData, setRefreshData] = useState(false)
  const [changeEntry, setChangeEntry] = useState({"change": false,"id":0})
  const [changeIngredient, setChangeIngredient] = useState({"change": false,"id":0})
  const [newIngredientName, setNewIngredientName] = useState("")
  const [addNewEntry, setAddNewEntry] = useState(false)
  const [newEntry, setNewEntry] = useState({"food":"Khana", "ingredients":"", "fat":0.0, "calories": 0})

// For the initial entires shown in the page
  useEffect(() => {
    getAllEntries();
  }, [])

  if(refreshData){
    setRefreshData(false);
    getAllEntries();
  }

  return (
    <>
    <div>
            <Container>
        <Button onClick={() => setAddNewEntry(true)}>Track today's calories</Button>
            </Container>
            <Container>
        {entries != null && entries.map((entry, i) =>(
            <Entry entryData={entry} deleteSingleEntry={deleteSingleEntry} setChangeIngredient={setChangeIngredient} setChangeEntry={setChangeEntry} />
        ))}
            </Container>

            <Modal show={addNewEntry} onHide={() => setAddNewEntry(false)} centred>
            <Modal.Header closeButton>
            <Modal.Title>Add Calorie Entry</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group>
                    <Form.Label>food</Form.Label>
                    <Form.Control onChange={(event) => {newEntry.food = event.target.value}}></Form.Control>
                    <Form.Label>ingredients</Form.Label>
                    <Form.Control onChange={(event) => {newEntry.ingredients = event.target.value}}></Form.Control>
                    <Form.Label>calories</Form.Label>
                    <Form.Control onChange={(event) => {newEntry.calories = event.target.value}}></Form.Control>
                    <Form.Label>fat</Form.Label>
                    <Form.Control type="number" onChange={(event) => {newEntry.fat = event.target.value}}></Form.Control>
                </Form.Group>
                <Button onClick={() => addSingleEntry()}>Add</Button>
                <Button onClick={()=> setAddNewEntry(false)}>Cancel</Button>
            </Modal.Body>
            </Modal>

            <Modal show={changeIngredient.change} onHide={() => setChangeIngredient({"change": false, "id":0})} centred>
            <Modal.Header closeButton>
                <Modal.Title>Change Ingredients</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group>
                    <Form.Label>new ingredients</Form.Label>
                    <Form.Control onChange={(event) => {setNewIngredientName(event.target.value)}}></Form.Control>
                </Form.Group>
                <Button onClick={() => changeIngredientForEntry()}>Change</Button>
                <Button onClick={() => setChangeIngredient({"change": false, "id":0})}>Cancel</Button>
            </Modal.Body>
            </Modal>

            <Modal show={changeEntry.change} onHide={() => setChangeEntry({"change": false, "id":0})} centred>
            <Modal.Header closeButton>
                <Modal.Title>Change Entry</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>food</Form.Label>
                    <Form.Control onChange={(event) => {newEntry.food = event.target.value}}></Form.Control>
                    <Form.Label>ingredients</Form.Label>
                    <Form.Control onChange={(event) => {newEntry.ingredients = event.target.value}}></Form.Control>
                    <Form.Label>calorie</Form.Label>
                    <Form.Control onChange={(event) => {newEntry.calories = event.target.value}}></Form.Control>
                    <Form.Label>fat</Form.Label>
                    <Form.Control type="number" onChange={(event) => {newEntry.fat = event.target.value}}></Form.Control>
                </Form.Group>
                <Button onClick={() => changeSingleEntry()}>Change</Button>
                <Button onClick={() => setChangeEntry({"change": false, "id":0})}>Cancel</Button>
            </Modal.Body>
        </Modal>
        </div> 
    </>
  );

  function getAllEntries(){
    var url = "http://localhost:6000/allfood"
    axios.get(url, {
      responseType: 'json'
    }).then(response => {
      if (response.status == 200){
        setEntries(response.data)
      }
    })
  }
  
  function addSingleEntry(){
    setAddNewEntry(false)
    var url = "http://localhost:6000/food/create/"
    // axios.post(url, functions)
    axios.post(url, {
      "ingredients": newEntry.ingredients,
      "food": newEntry.food,
      "fat": parseFloat(newEntry.fat),
      "calories": newEntry.calories
    }).then(response => {
      if (response.status == 200){
        setRefreshData(true)
      }
    })
  }

  function changeSingleEntry(){
    changeEntry.change = false;
    var url ="http://localhost:6000/food/update/" + changeEntry.id;
    axios.put(url, newEntry).then(response => {
      if (response.status == 200){
        setRefreshData(true)
      }
    })
  }

  function changeIngredientForEntry(){
    changeIngredient.change = false
    var url = "http://localhost:6000/ingredient/update/" + changeIngredient.id
    axios.put(url, {
      "ingredient": newIngredientName
    }).then(response => {
      if (response.status == 200 ){
        setRefreshData(true)
      }
    })
  }
  
  function deleteSingleEntry(id){
    var url = "http://localhost:6000/food/delete/" + id
    axios.delete(url, {
  
    }).then(response => {
      if (response.status == 200){
        setRefreshData(true)
      }
    })
  }
}

export default Entries