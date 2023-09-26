import React from 'react'
import FoodEntry from './FoodEntry'

export default function FoodEntries() {
  return (
    <div>
      <div>
        <h1>Calroies</h1>
      </div>
      <div>
            {entires && entries.map((entry, i) => (
                <FoodEntry foodEntry={foodEntry} />
            ))}
      </div>
    </div>
  )
}
