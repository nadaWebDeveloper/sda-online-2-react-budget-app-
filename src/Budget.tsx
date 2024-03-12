import "./App.css";
import { useState } from "react";

import "./App.css";

import SavingTarget from "./components/SavingTarget";
import SavingAmount from "./components/SavingAmount";
import Form from "./components/Form";
import { ToastContainer } from "react-toastify";

function Budget() {
  let [totalIncome, setTotalIncome] = useState(0);
  let [totalExpenses, setTotalExpenses] = useState(0);
  let [totalSaving, setTotalSaving] = useState(0);

  let getTotalSavingUpdated = (finalSaving: number) => {
    setTotalSaving(finalSaving);
  };

  let totalIncomeUpdated = (finalIncome: number) => {
    setTotalIncome(finalIncome);
  };

  let totalExpensesUpdated = (finalExpense: number) => {
    setTotalExpenses(finalExpense);
  };

  return (
    <>
      <ToastContainer />
      <Form
        totalIncomeUpdated={totalIncomeUpdated}
        totalExpensesUpdated={totalExpensesUpdated}
        typeForm={"Incomes"}
      />

      <Form
        totalExpensesUpdated={totalExpensesUpdated}
        totalIncomeUpdated={totalIncomeUpdated}
        typeForm={"Expenses"}
      />

      <SavingAmount
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        getTotalSavingUpdated={getTotalSavingUpdated}
      />

      <SavingTarget totalSaving={totalSaving} />
    </>
  );
}

export default Budget;
