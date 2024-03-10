import React from "react";

function SavingAmount(props: { totalIncome: number; totalExpenses: number }) {
  let balance = props.totalExpenses - props.totalIncome;
  let positiveBalance = Math.abs(balance);

  return (
    <>
      <div>
        <form action="">
          <div>
            <h3>Current Balance: {positiveBalance}</h3>
          </div>
          <div>
            <label htmlFor="transfer">Transfer To Saving Amount:</label>
            <input type="number" name="transfer" id="transfer" />
            <button type="submit">Transfer</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SavingAmount;
