import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function TeamPage() {
  const { teamAbbrev } = useParams();
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const teamColors = {
    ANA: "bg-orange-500",
    BOS: "bg-yellow-500",
    BUF: "bg-blue-600",
    CGY: "bg-red-700",
    CAR: "bg-red-700",
    CHI: "bg-red-700",
    COL: "bg-red-900",
    CBJ: "bg-blue-900",
    DAL: "bg-green-700",
    DET: "bg-red-700",
    EDM: "bg-orange-500",
    FLA: "bg-red-600",
    LAK: "bg-gray-600",
    MIN: "bg-green-900",
    MTL: "bg-red-700",
    NJD: "bg-red-600",
    NSH: "bg-yellow-500",
    NYI: "bg-blue-600",
    NYR: "bg-blue-800",
    OTT: "bg-red-700",
    PHI: "bg-orange-700",
    PIT: "bg-yellow-500",
    SEA: "bg-teal-300",
    SJS: "bg-teal-600",
    STL: "bg-blue-700",
    TBL: "bg-blue-600",
    TOR: "bg-blue-600",
    UTA: "bg-blue-400",
    VAN: "bg-blue-800",
    VGK: "bg-yellow-600",
    WSH: "bg-red-600",
    WPG: "bg-blue-500",
  };

  const teamColor = teamColors[teamAbbrev] || "bg-gray-700"; // Default to gray if team color isn't found

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/roster/${teamAbbrev}/20242025`)
      .then((response) => {
        const allPlayers = [
          ...(response.data.forwards || []),
          ...(response.data.defensemen || []),
          ...(response.data.goalies || []),
        ];
        setRoster(allPlayers);
      })
      .catch((error) => {
        console.error("Error fetching roster data:", error);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, [teamAbbrev]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
        <p className="text-xl font-semibold text-gray-700 animate-pulse">
          Loading roster...
        </p>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-red-300">
        <p className="text-xl font-semibold text-red-700">
          Error loading roster data. Please try again later.
        </p>
      </div>
    );

  return (
    <div className={`${teamColor} min-h-screen flex flex-col items-center`}>
      <header
        className={`w-full py-12 text-white text-center ${teamColor} shadow-md`}
      >
        <h1 className="text-5xl font-bold mb-4">{teamAbbrev} Team Roster</h1>
      </header>

      <section className="w-full px-6 py-8 bg-opacity-80 bg-gray-800 shadow-lg rounded-lg max-w-7xl -mt-12">
        {roster.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No players available for this team.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {roster.map((player) => (
              <Link
                key={player.id}
                to={`/player/${player.id}`}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all ease-in-out duration-300 transform hover:scale-105"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={player.headshot}
                    alt={`${player.firstName.default} ${player.lastName.default}`}
                    className="h-32 w-32 mx-auto rounded-full object-cover mb-4 border-4 border-blue-500"
                  />
                  <h3 className="text-2xl font-semibold text-gray-800">{`${player.firstName.default} ${player.lastName.default}`}</h3>
                  <p className="text-lg text-gray-600">
                    {player.positionCode === "L" || player.positionCode === "R"
                      ? `${player.positionCode}W`
                      : player.positionCode}
                  </p>
                  <p className="text-lg text-gray-500">
                    #{player.sweaterNumber}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default TeamPage;
