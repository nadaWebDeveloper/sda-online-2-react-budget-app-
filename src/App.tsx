import { BrowserRouter, Route, Routes } from "react-router-dom";

import Budget from "./components/Budget";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Budget />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
