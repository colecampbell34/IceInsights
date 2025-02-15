import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TeamPage from "./components/TeamPage";
import PlayerPage from "./components/PlayerPage";
import StandingsPage from "./components/Standings";

function App() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then((response) => {
        setTeams(response.data.standings);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <Router>
      <div className="mx-auto">
        <Routes>
          {/* NHL Standings Page */}
          <Route path="/" element={<StandingsPage teams={teams} />} />
          {/* Team Page */}
          <Route path="/team/:teamAbbrev" element={<TeamPage />} />
          {/* Player Page */}
          <Route path="/player/:playerId" element={<PlayerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
