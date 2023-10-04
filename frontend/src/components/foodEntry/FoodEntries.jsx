import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Entry from './FoodEntry'

const Entries =() => {
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

function deleteSingleEntry(id){
  var url = "http://localhost:6000/food/delete" + id
  axios.delete(url, {

  }).then(response => {
    if (response.status == 200){
      setRefreshData(true)
    }
  })
}