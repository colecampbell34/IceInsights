import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function StandingsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/standings")
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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
        <p className="text-xl font-semibold text-gray-700 animate-pulse">
          Loading standings...
        </p>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-red-300">
        <p className="text-xl font-semibold text-red-700">
          Error loading standings. Please try again later.
        </p>
      </div>
    );

  return (
    <div className="mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">NHL Standings</h1>
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
                <Link
                  to={`/team/${team.teamAbbrev.default}`}
                  className="font-bold text-blue-600 hover:underline"
                >
                  {team.teamName.default}
                </Link>
              </td>
              <td className="border px-4 py-2">{team.gamesPlayed}</td>
              <td className="border px-4 py-2">{team.wins}</td>
              <td className="border px-4 py-2">{team.losses}</td>
              <td className="border px-4 py-2">{team.otLosses}</td>
              <td className="border px-4 py-2 font-bold">{team.points}</td>
              <td
                className={`border px-4 py-2 font-bold ${
                  team.goalDifferential > 0
                    ? "text-green-600"
                    : team.goalDifferential < 0
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {team.goalDifferential}
              </td>
              <td className="border px-4 py-2">
                {team.regulationPlusOtWinPctg.toFixed(3).slice(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StandingsPage;
