import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateItem from "./pages/CreateItem";
import ItemDetails from "./pages/ItemDetails";
import AllItems from "./pages/AllItems";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllItems />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-item" element={<CreateItem />} />
        <Route path="/items/:id" element={<ItemDetails />} />
      </Routes>
    </>
  );
}

export default App;