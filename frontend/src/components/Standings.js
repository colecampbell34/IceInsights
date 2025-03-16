import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../index.css";

function StandingsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/standings")
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700">
        <p className="text-xl font-semibold text-white animate-pulse">
          Loading standings...
        </p>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-900 to-red-700">
        <p className="text-xl font-semibold text-white">
          Error loading standings. Please try again later.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          NHL Standings
        </h1>
        <div className="overflow-x-auto rounded-lg shadow-xl">
          <table className="min-w-full bg-gradient-to-br from-gray-800 to-gray-700 text-white">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                  Team
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium uppercase tracking-wider">
                  GP
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium uppercase tracking-wider">
                  W
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium uppercase tracking-wider">
                  L
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium uppercase tracking-wider">
                  OT
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium uppercase tracking-wider">
                  PTS
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium uppercase tracking-wider">
                  GD
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium uppercase tracking-wider">
                  Win %
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {teams.map((team, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-800 transition duration-150 ease-in-out"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={team.teamLogo}
                      alt={team.teamAbbrev.default}
                      className="h-10 w-10 mx-auto"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/team/${team.teamAbbrev.default}`}
                      className="font-bold text-blue-400 hover:text-blue-300 transition duration-150 ease-in-out"
                    >
                      {team.teamName.default}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center">{team.gamesPlayed}</td>
                  <td className="px-6 py-4 text-center">{team.wins}</td>
                  <td className="px-6 py-4 text-center">{team.losses}</td>
                  <td className="px-6 py-4 text-center">{team.otLosses}</td>
                  <td className="px-6 py-4 text-center font-bold">
                    {team.points}
                  </td>
                  <td
                    className={`px-6 py-4 text-center font-bold ${
                      team.goalDifferential > 0
                        ? "text-green-400"
                        : team.goalDifferential < 0
                        ? "text-red-400"
                        : "text-gray-400"
                    }`}
                  >
                    {team.goalDifferential}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {team.regulationPlusOtWinPctg.toFixed(3).slice(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StandingsPage;
