import React, { useEffect, useState } from "react";
import TeamCard from './components/TeamCard';

function App() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedYear, setSelectedYear] = useState(""); // Filter by year
  const [showActiveTeams, setShowActiveTeams] = useState(true); // Toggle active teams
  const [sortBy, setSortBy] = useState(""); // Sorting criteria

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(
          "https://api.allorigins.win/raw?url=https://records.nhl.com/site/api/franchise"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTeams(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return <div className="text-center text-lg text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  const filteredTeams = teams
    .filter((team) => (showActiveTeams ? team.lastSeasonId === null : true))
    .filter((team) =>
      selectedYear ? team.firstSeasonId.toString().startsWith(selectedYear) : true
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.fullName.localeCompare(b.fullName); // Sort alphabetically
      }
      if (sortBy === "firstSeason") {
        return b.firstSeasonId - a.firstSeasonId; // Sort by year
      }
      return 0; // No sorting
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">NHL Teams</h1>

      {/* Filter & Sorting Controls */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-center space-y-6 sm:space-y-0 sm:space-x-6 mb-8">
        <div className="flex items-center">
          <label className="mr-2 font-medium text-lg text-gray-700">Filter by Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Years</option>
            {Array.from(new Set(teams.map((team) => team.firstSeasonId.toString().slice(0, 4))))
              .sort()
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </select>
        </div>

        <div className="flex items-center">
          <label className="mr-2 font-medium text-lg text-gray-700">Active Teams Only:</label>
          <input
            type="checkbox"
            checked={showActiveTeams}
            onChange={() => setShowActiveTeams(!showActiveTeams)}
            className="ml-2 h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center">
          <label className="mr-2 font-medium text-lg text-gray-700">Sort By:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Oldest</option>
            <option value="firstSeason">Newest</option>
            <option value="name">Alphabetically</option>
          </select>
        </div>
      </div>

      {/* Displaying Teams */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredTeams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
}

export default App;