import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TeamDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teamDetails, setTeamDetails] = useState(null);
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        // Fetch team details (including season stats)
        const teamResponse = await fetch(
          `/v1/teams/${id}?expand=team.stats`
        );
        if (!teamResponse.ok) {
          throw new Error(`HTTP error! status: ${teamResponse.status}`);
        }
        const teamData = await teamResponse.json();
        setTeamDetails(teamData.teams[0]);

        // Fetch team roster
        const rosterResponse = await fetch(
          `/v1/teams/${id}/roster`
        );
        if (!rosterResponse.ok) {
          throw new Error(`HTTP error! status: ${rosterResponse.status}`);
        }
        const rosterData = await rosterResponse.json();
        setRoster(rosterData.roster);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center text-lg text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!teamDetails) {
    return <div className="text-center text-red-500">Team not found!</div>;
  }

  const { name, teamName, abbreviation, venue, officialSiteUrl, teamStats } =
    teamDetails;

  const stats = teamStats && teamStats[0]?.splits[0]?.stat;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
      >
        Back
      </button>

      {/* Team Header */}
      <div className="flex items-center mb-8">
        <img
          src={`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${id}.svg`}
          alt={`${teamName} logo`}
          className="w-24 h-24 mr-6"
        />
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">{name}</h1>
          <p>
            <strong>Abbreviation:</strong> {abbreviation}
          </p>
          <p>
            <strong>Venue:</strong> {venue.name}
          </p>
          <p>
            <strong>Official Site:</strong>{" "}
            <a
              href={officialSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              {officialSiteUrl}
            </a>
          </p>
        </div>
      </div>

      {/* Season Stats */}
      {stats ? (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Season Stats</h2>
          <p>
            <strong>Games Played:</strong> {stats.gamesPlayed}
          </p>
          <p>
            <strong>Wins:</strong> {stats.wins}
          </p>
          <p>
            <strong>Losses:</strong> {stats.losses}
          </p>
          <p>
            <strong>Points:</strong> {stats.pts}
          </p>
        </div>
      ) : (
        <p className="text-gray-500">Season stats are not available.</p>
      )}

      {/* Roster */}
      <div>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Roster</h2>
        {roster.length > 0 ? (
          <table className="table-auto w-full text-left border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Player</th>
                <th className="px-4 py-2 border-b">Position</th>
                <th className="px-4 py-2 border-b">Jersey Number</th>
              </tr>
            </thead>
            <tbody>
              {roster.map((player) => (
                <tr key={player.person.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">
                    {player.person.fullName}
                  </td>
                  <td className="px-4 py-2 border-b">{player.position.name}</td>
                  <td className="px-4 py-2 border-b">{player.jerseyNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No roster information available.</p>
        )}
      </div>
    </div>
  );
};

export default TeamDetails;