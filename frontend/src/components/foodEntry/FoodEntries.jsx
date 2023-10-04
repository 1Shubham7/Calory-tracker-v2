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
  const [newEntry, setNewEntry] = useState({"food":"Khana", "ingredients":"", "fat":0, "calories": 0})

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
    <div className='container'>
      <div onClick={() => setAddNewEntry(true)}>Today's calories</div>
    </div>
    <div className="container">
      {entries != null && entries.map((entry, i)=>(
        <Entry entryData={entry} setChangeIngredient={setChangeIngredient} setChangeEntry={setChangeEntry} deleteSingleEntry={deleteSingleEntry}/>
      ))}
    </div>
    </>
  );

  function getAllEntries(){
    var url = "http://localhost:6000/allfood/"
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
    var url = "http://localhost:6000/food/create"
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