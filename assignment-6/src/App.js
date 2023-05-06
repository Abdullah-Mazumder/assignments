import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SinglePostDetails from "./pages/SinglePostDetails";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:postId" element={<SinglePostDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
