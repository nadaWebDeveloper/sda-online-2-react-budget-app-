import { BrowserRouter, Route, Routes } from "react-router-dom";

import Budget from "./Budget";

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
