import React from 'react'

function SavingAmount() {
  return (
    <>
       <div>
        <form action="">
            <div>
                <h3>Current Balance: {6789}</h3>
            </div>
            <div>
                <label htmlFor="transfer">Transfer To Saving Amount:</label>
                <input type="number" name="transfer" id="transfer" />
                <button type="submit">Transfer</button>
            </div>
        </form>
        </div> 
    </>
  )
}

export default SavingAmount