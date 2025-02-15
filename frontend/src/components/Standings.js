import React from "react";

function StandingsPage({ teams }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-8">
      {/* Header Section */}
      <header className="bg-blue-900 text-white p-6 rounded-md shadow-md mb-8">
        <h1 className="text-4xl font-bold">Ice Insights</h1>
        <p className="text-lg mt-2">
          Your go-to NHL analytics dashboard for predicting game outcomes!
        </p>
      </header>

      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4 rounded-md shadow-md mb-8">
        <ul className="flex space-x-6 justify-center">
          <li>
            <a
              href="/"
              className="px-4 py-2 bg-blue-400 rounded hover:bg-blue-600 transition"
            >
              Link1
            </a>
          </li>
          <li>
            <a
              href="/teams"
              className="px-4 py-2 bg-blue-400 rounded hover:bg-blue-600 transition"
            >
              Link2
            </a>
          </li>
          <li>
            <a
              href="/players"
              className="px-4 py-2 bg-blue-400 rounded hover:bg-blue-600 transition"
            >
              Link3
            </a>
          </li>
          {/* Add more links as needed */}
        </ul>
      </nav>

      {/* NHL Standings Table */}
      <h2 className="text-2xl font-bold mb-4 text-center">NHL Standings</h2>
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
                <a
                  href={`/team/${team.teamAbbrev.default}`}
                  className="font-bold text-blue-500 hover:underline"
                >
                  {team.teamName.default}
                </a>
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
                }`}>
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
