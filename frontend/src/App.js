import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Standings from "./components/Standings";
import TeamPage from "./components/TeamPage";
import PlayerPage from "./components/PlayerPage";
import LandingPage from "./components/LandingPage";
import GamePredictor from "./components/GamePredictor";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop/>

      <div className="min-h-screen bg-gray-100">
        {/* Header/Navbar */}
        <header className="bg-black text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-yellow-50 text-3xl font-bold">Ice Insights</h1>
            <nav>
              <Link to="/" className="font-bold text-yellow-50 mx-2 hover:underline">
                Home
              </Link>
              <Link to="/standings" className="font-bold text-yellow-50 mx-2 hover:underline">
                NHL Standings
              </Link>
              <Link to="/predictor" className="font-bold text-yellow-50 mx-2 hover:underline">
                Game Predictor
              </Link>
            </nav>
          </div>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/standings" element={<Standings />} />

          <Route path="/predictor" element={<GamePredictor />} />

          <Route path="/team/:teamAbbrev" element={<TeamPage />} />

          <Route path="/player/:playerId" element={<PlayerPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
