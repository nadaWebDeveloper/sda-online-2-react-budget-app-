
function Expenses() {
  return (
    <>
      <div>
        <form action="">
          <div>
            <label htmlFor="expense">Expense Source:</label>
            <input type="text" value="0" name="expense" id="expense" />
          </div>
          <div>
            <label htmlFor="amount">Amount Expense</label>
            <input type="number" name="amount" id="amount" />
          </div>
          <div>
            <label htmlFor="date">Date Expense:</label>
            <input type="date" name="date" id="date" />
          </div>
          <button type="submit">Add Expense</button>
        </form>
      </div>
    </>
  );
}

export default Expenses;
