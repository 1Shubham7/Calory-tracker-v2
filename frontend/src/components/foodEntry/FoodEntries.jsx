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