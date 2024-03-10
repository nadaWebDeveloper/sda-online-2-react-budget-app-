import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

import { TypeForm } from "./Types";

const attributeForm: TypeForm = {
  Id: '',
  Source: '',
  Amount: 0,
  Date: ''
};
function Form(props:{totalIncomeUpdated: (finalIncome: number) => void,totalExpensesUpdated:(finalExpense: number) => void, typeForm:string}) {
  const [formArray, setFormArray] = useState<TypeForm[]>([]);
  const [formItem, setFormItem] = useState(attributeForm);
  const [error, setError] = useState('');

  const totalAmount = useMemo(() => {
    return formArray.reduce((total, current) => {
      return total + parseInt(current.Amount.toString());
    }, 0);
  }, [formArray]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormItem((prevIncome) => ({
      ...prevIncome,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      formItem.Amount &&
      formItem.Source &&
      formItem.Date
    ) {
      if (formItem.Amount > 0) {
        const newIn = { ...formItem , id: uuidv4()}
        setFormArray((prevItem) => [...prevItem,newIn]);
        setFormItem(attributeForm);
        alert(`Added New ${props.typeForm}`);
      } else {
        alert("Enter Positive Number");
      }
    }
  };

  useEffect(()=> {
    if(props.typeForm === `Incomes`){
      props.totalIncomeUpdated(totalAmount)
    }else{
      props.totalExpensesUpdated(totalAmount)
    }
  },[totalAmount,formArray, props ])

 const handleFocus = () => {
    if(formItem.Source.length < 2){
      setError(' * Minimum Length Must be 3')
    }
 }
 const handleBlur = () => {

    setError('')
 
 }

  const handleDelete = (incomeId: string) => {
    const findItem = formArray.find((id) => id.Id === incomeId);
    const formatDate= format(new Date(findItem?.Date), "eee - d MMM yyyy")
    const text = `[${findItem?.Source}: ${findItem?.Amount} RS On ${formatDate}}]`;
    const confirmValue = confirm(`Are Yuu Sure To Delete ? \n${text}`);
    if (confirmValue) {
      const deleteIncome = formArray.filter((id) => id.Id !== incomeId);
      setFormArray(deleteIncome);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="incomeSource">{props.typeForm} Source:</label>
            <input
              type="text"
              value={formItem.Source}
              name="incomeSource"
              id="incomeSource"
              placeholder="Salary"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
            {error}
          </div>
          <div>
            <label htmlFor="incomeAmount">Amount {props.typeForm}</label>
            <input
              type="number"
              name="incomeAmount"
              id="incomeAmount"
              value={formItem.Amount}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
          </div>
          <div>
            <label htmlFor="incomeDate">Date {props.typeForm}:</label>
            <input
              type="date"
              name="incomeDate"
              id="incomeDate"
              value={formItem.Date}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Add {props.typeForm}</button>
        </form>
      </div>
      <div className="info-income">
        {formArray.length > 0 ? <p>Total Of Amount: <span>{totalAmount}</span>  RS <br /> {formArray.length>1 ?`${props.typeForm} Source: ${formArray.length}` :``} </p> : ""}
      </div>
      <div className="list-income">
        {formArray.length > 0 ? (
          formArray.map((attribute) => {
            return (
              <ul key={attribute.Id}>
                <li key={attribute.Id}>
                  {attribute.Source.charAt(0).toUpperCase() + attribute.Source.slice(1)}: {attribute.Amount} RS On
                  {format(new Date(attribute.Date), " eee - d MMM yyyy")}
                  <button onClick={() => handleDelete(attribute.Id)}>
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