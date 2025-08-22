import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Model from "./components/Model";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <Routes>
          <Route index element={<Home />} /> {/* ✅ Default route */}
          <Route path="/" element={<Home />} />
          <Route path="/models" element={<Model />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
