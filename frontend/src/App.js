import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TeamPage from "./components/TeamPage";
import PlayerPage from "./components/PlayerPage";

function App() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/") // Ensure this matches your backend route for standings
      .then((response) => {
        setTeams(response.data.standings); // Adjust according to the API response structure
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">NHL Standings</h1>
        <Routes>
          <Route
            path="/"
            element={
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-4 py-2">Logo</th>
                    <th className="border px-4 py-2">Team</th>
                    <th className="border px-4 py-2">Games Played</th>
                    <th className="border px-4 py-2">Wins</th>
                    <th className="border px-4 py-2">Losses</th>
                    <th className="border px-4 py-2">OT Losses</th>
                    <th className="border px-4 py-2">Points</th>
                    <th className="border px-4 py-2">Goal Differential</th>
                    <th className="border px-4 py-2">Win %</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, index) => (
                    <tr key={index} className="text-center">
                      <td className="border px-4 py-2">
                        <img
                          src={team.teamLogo}
                          alt={team.teamAbbrev.default}
                          className="h-10 mx-auto"
                        />
                      </td>
                      <td className="border px-4 py-2">
                        {/* Link to team page */}
                        <Link to={`/team/${team.teamAbbrev.default}`} className="text-blue-500 hover:underline">
                          {team.teamName.default}
                        </Link>
                      </td>
                      <td className="border px-4 py-2">{team.gamesPlayed}</td>
                      <td className="border px-4 py-2">{team.wins}</td>
                      <td className="border px-4 py-2">{team.losses}</td>
                      <td className="border px-4 py-2">{team.otLosses}</td>
                      <td className="border px-4 py-2 font-bold">{team.points}</td>
                      <td className="border px-4 py-2">{team.goalDifferential}</td>
                      <td className="border px-4 py-2">{team.regulationPlusOtWinPctg.toFixed(3).slice(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
          />
          <Route path="/team/:teamAbbrev" element={<TeamPage />} />
          <Route path="/player/:playerId" element={<PlayerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
