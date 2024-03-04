import './App.css';
import Income from './components/Income';
import SavingTarget from './components/SavingTarget';
import Expenses from './components/Expenses';
import SavingAmount from './components/SavingAmount';

function App() {
  return (
    <div >
     <Income />
     <Expenses />
     <SavingTarget />
     <SavingAmount />
    </div>
  );
}

export default App;
