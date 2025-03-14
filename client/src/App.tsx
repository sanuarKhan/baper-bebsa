import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TodaysAccount from "./pages/TodaysAccount";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-account" element={<TodaysAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
