import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Edit from "./components/pages/Edit";
import AddJob from "./components/pages/AddJob";
import LeftSideBar from "./components/LeftSideBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <LeftSideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs/add" element={<AddJob />} />
          <Route path="/edit/:jobId" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
