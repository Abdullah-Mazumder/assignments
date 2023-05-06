import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/edit-task/:taskId" element={<EditTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
