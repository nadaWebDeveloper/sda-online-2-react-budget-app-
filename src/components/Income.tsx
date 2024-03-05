import { ChangeEvent, FormEvent, useMemo, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

import { typeIncome } from "./Types";

const income: typeIncome = {
  id: "",
  incomeSource: "",
  incomeAmount: 0,
  incomeDate: "",
};
function Income() {
  const [incomeArray, setIncomeArray] = useState<typeIncome[]>([]);
  const [incomeItem, setIncomeItem] = useState(income);
  const totalAmount = useMemo(() => {
    return incomeArray.reduce((total, current) => {
      return total + parseInt(current.incomeAmount.toString());
    }, 0);
  }, [incomeArray]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setIncomeItem((prevIncome) => ({
      ...prevIncome,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      incomeItem.incomeAmount &&
      incomeItem.incomeSource &&
      incomeItem.incomeDate
    ) {
      if (incomeItem.incomeAmount > 0) {
        const neeIncome = {
          id: uuidv4(),
          incomeSource: incomeItem.incomeSource,
          incomeAmount: incomeItem.incomeAmount,
          incomeDate: incomeItem.incomeDate,
        };
        setIncomeArray((prevItem) => [...prevItem, neeIncome]);
        setIncomeItem(income);
        alert("Added New Income");
      } else {
        alert("Enter Positave Number");
      }
    }
  };

  const handleDelete = (incomeId: string) => {
    const findItem = incomeArray.find((id) => id.id === incomeId);
    const text = `[${findItem?.incomeSource}: ${findItem?.incomeAmount} RS On ${format(new Date(findItem?.incomeDate), "eee - d MMM yyyy")}]`;
    const confirmValue = confirm(`Are Yuu Sure To Delete ? \n${text}`);
    if (confirmValue) {
      const deleteIncome = incomeArray.filter((id) => id.id !== incomeId);
      setIncomeArray(deleteIncome);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="incomeSource">Income Source:</label>
            <input
              type="text"
              value={incomeItem.incomeSource}
              name="incomeSource"
              id="incomeSource"
              placeholder="Salary"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="incomeAmount">Amount Income</label>
            <input
              type="number"
              name="incomeAmount"
              id="incomeAmount"
              value={incomeItem.incomeAmount}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="incomeDate">Date Income:</label>
            <input
              type="date"
              name="incomeDate"
              id="incomeDate"
              value={incomeItem.incomeDate}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Add Income</button>
        </form>
      </div>
      <div>
        {incomeArray.length > 0 ? <p>Total Of Amount: {totalAmount} RS</p> : ""}
      </div>
      <div>
        {incomeArray.length > 0 ? (
          incomeArray.map((income) => {
            return (
              <ul key={income.id}>
                <li key={income.id}>
                  {income.incomeSource}: {income.incomeAmount} RS On
                  {format(new Date(income.incomeDate), " eee - d MMM yyyy")}
                  <button onClick={() => handleDelete(income.id)}>
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

export default Income;
