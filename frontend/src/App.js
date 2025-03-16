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
      <ScrollToTop />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700">
        {/* Header/Navbar */}
        <header className="sticky top-0 bg-gray-800 text-white p-4 z-50 shadow-lg">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-400">
              Ice Insights
            </h1>
            <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
              <Link
                to="/"
                className="font-semibold text-gray-300 hover:text-blue-400 transition duration-300 text-center"
              >
                Home
              </Link>
              <Link
                to="/standings"
                className="font-semibold text-gray-300 hover:text-blue-400 transition duration-300 text-center"
              >
                NHL Standings
              </Link>
              <Link
                to="/predictor"
                className="font-semibold text-gray-300 hover:text-blue-400 transition duration-300 text-center"
              >
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