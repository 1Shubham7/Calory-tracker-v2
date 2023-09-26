import React from 'react'

export default function FoodEntry() {
    const Entry = ({foodEntry, setChangeIngredient, deleteFoodEntry, setChangeEntry}) => {
        // the struct we created in backend , all the data from there will come to foodEntry
        return (
            <div>
                <table>
                    <td>Food: {foodEntry.food}</td>
                    <td>Fat: {foodEntry.food}</td>
                    <td>Calroies: {foodEntry.food}</td>
                    <td>Ingredients: {foodEntry.food}</td>
                </table>
              
            </div>
          )
    }
    

}
