import { BrowserRouter, Route, Routes } from "react-router-dom";

import Budget from "./components/Budget";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/budget-app" element={<Budget />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
