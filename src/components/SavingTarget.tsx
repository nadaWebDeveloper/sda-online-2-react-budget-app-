import { useContext, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form";

import TitlePage from "./TitlePage";
import { BudgetContext } from "../../context/BudgetContext";


type Input = {
  target: number;
}


const SavingTarget = () => {

  const {totalSaving} = useContext(BudgetContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Input>();

  const [target, setTarget] = useState(0);
  const handleSubmitTarget: SubmitHandler<Input>  = (data) => {
    setValue('target', 0)
    setTarget(data.target);
  }

  const progress = (totalSaving /target || 0)* 100;
  return (
    <>
    <div>
    <TitlePage titlePage='Saving-target' />
        <form action="" onSubmit={handleSubmit(handleSubmitTarget)}>
            <div>
                <label htmlFor="target">Target: </label>
                <input type="number"  id="target"       
                 {...register("target", {
                required: " * Target Is Required ",
                min: { value: 1, message: " * The Minimum Amount Must Be 1 " },
              })}/>
             {errors.target && <span>{errors.target.message}</span>}
                <button >Reset</button>
            </div>
            </form>
            <form >
            <div>
                <p>Current Saving: {totalSaving} RS</p>
                <p>Target {target}</p>
                <label htmlFor="progress">Progress: {progress} %  </label>
                <progress value={totalSaving}  max={target} id="progress" />        
             </div>
        </form>
    </div>
        
    </>
  )
}

export default SavingTarget