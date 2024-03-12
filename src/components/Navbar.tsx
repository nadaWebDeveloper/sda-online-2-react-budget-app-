import { Link } from 'react-router-dom'

function Navbar() {
  return (
    < >
<div>
    <nav>
        <ul>
        <li>
         <Link to="/" className="line">Budget</Link>
        </li>  
        <li>
         <Link to="/income" className="line">Income Form</Link>
        </li>
        <li>
        <Link to="/expense" className="line">Expense From</Link>
        </li>
        <li>
        <Link to="/saving-amount" className="line">Target Saving</Link>
        </li>
        <li>
        <Link to="/saving-target" className="line">Transfer Saving </Link>
        </li>
        </ul>
    </nav>
</div>
    </>
  )
}

export default Navbar