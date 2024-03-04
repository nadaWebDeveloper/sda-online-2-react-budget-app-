import React from 'react'

function Income() {
  return (
    <>
        <div>
            <form action="">
                <div>
                   <label htmlFor="income">Income Source:</label>
                   <input type="text" value="0" name="income" id='income' placeholder='Salary' />
                </div>
                <div> 
                    <label htmlFor="amount">Amount Income</label>
                    <input type="number" name="amount" id="amount" />
                </div>
                <div>
                    <label htmlFor="date">Date Income:</label>
                    <input type="date" name="date" id="date" />
                </div>
                <button type="submit">Add Income</button>
            </form>
        </div>
    </>
  )
}

export default Income