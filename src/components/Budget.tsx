import { useState } from "react";

import { ToastContainer } from "react-toastify";

import SavingTarget from "./SavingTarget";
import SavingAmount from "./SavingAmount";
import Form from "./Form";
import { BudgetContext } from "../../context/BudgetContext";



const Budget = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalSaving, setTotalSaving] = useState(0);

  return (
    <>
      <BudgetContext.Provider
        value={{
          setTotalIncome,
          setTotalExpenses,
          setTotalSaving,
          totalIncome,
          totalExpenses,
          totalSaving,
        }}
      >
        <ToastContainer />
        <Form typeForm={"Incomes"} />

        <Form typeForm={"Expenses"} />

        <SavingAmount />

        <SavingTarget />
      </BudgetContext.Provider>
    </>
  );
}

export default Budget;
