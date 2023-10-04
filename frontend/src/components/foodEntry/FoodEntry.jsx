import React from 'react'

    const Entry = ({entryData, setChangeIngredient, deleteFoodEntry, setChangeEntry}) => {
        // the struct we created in backend , all the data from there will come to foodEntry
        return (
            <div>
                <table>
                    <tr>
                    <td>Food: {entryData !== undefined && entryData.food}</td> #making sure that entryData is not undefined
                    <td>Fat: {entryData !== undefined && entryData.fat}</td>
                    <td>Calroies: {entryData !== undefined && entryData.calories}</td>
                    <td>Ingredients: {entryData !== undefined && entryData.ingredients}</td>
                    <td><div onClick={()=> deleteFoodEntry(entryData._id)}>Delete entry</div></td>
                    <td><div onClick={()=> changeIngredient()}>Change Ingredients</div></td>
                    <td><div onClick={()=> changeEntry()}>Change entry</div></td>
                    </tr>
                </table>
              
            </div>
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
