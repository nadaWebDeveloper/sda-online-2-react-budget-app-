import { useEffect, useMemo, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import { toast } from 'react-toastify';
import TitlePage from "./TitlePage";


type savingProps = {
  totalIncome: number;
  totalExpenses: number;
  getTotalSavingUpdated: (finalSaving: number) => void;
};

type Input = {
  savingAmount: number;
};

function SavingAmount(props: savingProps) {
  const { totalIncome, totalExpenses, getTotalSavingUpdated } =
    props;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Input>();
  const [transfer, setTransfer] = useState(0);

  const balance = useMemo(() => {
    return Math.abs(totalExpenses - totalIncome) ;
  }, [totalExpenses, totalIncome]);

  const handleSubmitTransfer: SubmitHandler<Input> = (data) => {
    const amountTransfer = data.savingAmount;
    setTransfer(amountTransfer);
    setValue('savingAmount',0);
    toast.success(`Transfer To Target`);

  };

  useEffect(() => {
    getTotalSavingUpdated(transfer);
  }, [transfer, props]);

  return (
    <>
      <div>
      <TitlePage titlePage='Saving-amount' />
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
                max: {value: balance,message:` * The Maximum Amount Must Be Less Than ${balance}` },
              })}
            />
            {errors.savingAmount && <span>{errors.savingAmount.message}</span>}
            <button>Transfer</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SavingAmount;
