import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Curriculum from "./pages/Curriculum";
import HowWeWorkWithAI from "./pages/HowWeWorkWithAI";
import Quiz from "./pages/Quiz";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route
            path="/how-we-work-with-ai"
            element={<HowWeWorkWithAI />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;