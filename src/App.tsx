import "./App.css";
import SavingTarget from "./components/SavingTarget";
import SavingAmount from "./components/SavingAmount";
import { useState } from "react";
import Form from "./components/Form";

function App() {
  let [totalIncome, setTotalIncome] = useState(0);
  let [totalExpenses, setTotalExpenses] = useState(0);

  let totalIncomeUpdated = (finalIncome: number) => {
    console.log(finalIncome +'Incomes');
    setTotalIncome(finalIncome);
  };

  let totalExpensesUpdated = (finalExpense: number) => {
    console.log(finalExpense+'Expenses');
    setTotalExpenses(finalExpense);
  };

  return (
    <div>
      <Form totalIncomeUpdated={totalIncomeUpdated} totalExpensesUpdated={totalExpensesUpdated} typeForm={"Incomes"} />
      <Form totalExpensesUpdated={totalExpensesUpdated} totalIncomeUpdated={totalIncomeUpdated} typeForm={"Expenses"} />
      <SavingAmount totalIncome={totalIncome} totalExpenses={totalExpenses}/>
      <SavingTarget totalSaving={68} />
    </div>
  );
}

export default App;
