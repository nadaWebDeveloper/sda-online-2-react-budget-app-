import { useContext, useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import TitlePage from "./TitlePage";
import { BudgetContext } from "../../context/BudgetContext";


type Inputs = {
  id: string;
  Source: string;
  Amount: number;
  Date: string;
};
type FormProps = {
  typeForm: string;
};

const  Form = (props: FormProps) => {

  const {setTotalIncome, setTotalExpenses} = useContext(BudgetContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      Source: "",
      Amount: 0,
      Date: "",
    },
  });

  let [formData, setFormData] = useState<Inputs[]>([]);

  const totalAmount = useMemo(() => {
    return formData.reduce((total, current) => {
      return total + parseInt(current.Amount.toString());
    }, 0);
  }, [formData]);

  const handleSubmitForm: SubmitHandler<Inputs> = (data) => {
    const newData = { ...data, id: uuidv4() };
    formData = [newData, ...formData];
    setFormData((prevItem) => [...prevItem, newData]);
      setValue("Source", "");
      setValue("Amount", 0);
      setValue("Date", "");
     toast.success(`Added New ${props.typeForm}`);
  };

  useEffect(() => {
    if (props.typeForm === `Incomes`) {
      setTotalIncome(totalAmount);
    } else {
      setTotalExpenses(totalAmount);
    }
  }, [totalAmount, formData, props]);

  const handleDelete = (incomeId: string) => {
    const findItem = formData.find((id) => id.id === incomeId);
    const formatDate = format(new Date(findItem?.Date), "eee - d MMM yyyy");
    const text = `[${findItem?.Source}: ${findItem?.Amount} RS On ${formatDate}]`;
    const confirmValue = confirm(`Are Yuu Sure To Delete ? \n${text}`);
    if (confirmValue) {
      const deleteIncome = formData.filter((id) => id.id !== incomeId);
      setFormData(deleteIncome);
    }
  };

  return (
    <>
      <div>
        <TitlePage titlePage={props.typeForm} />
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div>
            <label htmlFor="Source">{props.typeForm} Source: </label>
            <input
              type="text"
              id="Source"
              placeholder="Salary"
              {...register("Source", {
                required: " * Field Is Required ",
                minLength: {
                  value: 3,
                  message: " * The Minimum Length Must Be 3 Characters",
                },
              })}
            />
            {errors.Source && <span>{errors.Source.message}</span>}
          </div>
          <div>
            <label htmlFor="Amount">Amount {props.typeForm}: </label>
            <input
              type="number"
              id="Amount"
              {...register("Amount", {
                required: " *  Amount Field Is Required ",
                min: { value: 1, message: " * The Minimum Amount Must Be 1 " },
              })}
            />
            {errors.Amount && <span>{errors.Amount.message}</span>}
          </div>
          <div>
            <label htmlFor="Date">Date {props.typeForm}: </label>
            <input
              type="date"
              id="Date"
              {...register("Date", {
                required: " * Date Field Is Required ",
              })}
            />
            {errors.Date && <span>{errors.Date.message}</span>}
          </div>
          <button type="submit">
            Add {props.typeForm}
          </button>
        </form>
      </div>
      <div className="info-income">
        {formData.length > 0 ? (
          <p>
            Total Of Amount: <span>{totalAmount}</span> RS <br />{" "}
            {formData.length > 1
              ? `${props.typeForm} Source: ${formData.length}`
              : ``}{" "}
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="list-income">
        {formData.length > 0 ? (
          formData.map((attribute) => {
            return (
              <ul key={attribute.id}>
                <li key={attribute.id}>
                  {attribute.Source.charAt(0).toUpperCase() +
                    attribute.Source.slice(1)}
                  : {attribute.Amount} RS On
                  {format(new Date(attribute.Date), " eee - d MMM yyyy")}
                  <button onClick={() => handleDelete(attribute.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </li>
              </ul>
            );
          })
        ) : (
          <h3>----------------</h3>
        )}
      </div>
    </>
  );
}

export default Form;
