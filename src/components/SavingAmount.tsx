import { useContext, useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { toast } from "react-toastify";

import TitlePage from "./TitlePage";
import { BudgetContext } from "../../context/BudgetContext";

type SavingProps = {
  totalIncome: number;
  totalExpenses: number;
  setTotalSaving: number;
};

type Input = {
  savingAmount: number;
};

const SavingAmount = () => {
  const { totalIncome, totalExpenses, setTotalSaving } =
    useContext(BudgetContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Input>();
  const [transfer, setTransfer] = useState(0);

  const balance = useMemo(() => {
    return Math.abs(totalExpenses - totalIncome);
  }, [totalExpenses, totalIncome]);

  const handleSubmitTransfer: SubmitHandler<Input> = (data) => {
    const amountTransfer = data.savingAmount;
    setTransfer(amountTransfer);
    setValue("savingAmount", 0);
    toast.success(`Transfer To Target`);
  };

  useEffect(() => {
    setTotalSaving(transfer);
  }, [transfer]);

  return (
    <>
      <div>
        <TitlePage titlePage="Saving-amount" />
        <div>
          <h3>Current Balance: {balance}</h3>
        </div>
        <form onSubmit={handleSubmit(handleSubmitTransfer)}>
          <div>
            <label htmlFor="transfer">Transfer To Saving Amount: </label>
            <input
              type="number"
              id="transfer"
              {...register("savingAmount", {
                required: " * Saving Amount Is Required ",
                min: { value: 1, message: " * The Minimum Amount Must Be 1 " },
                max: {
                  value: balance,
                  message: ` * The Maximum Amount Must Be Less Than ${balance}`,
                },
              })}
            />
            {errors.savingAmount && <span>{errors.savingAmount.message}</span>}
            <button>Transfer</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SavingAmount;
