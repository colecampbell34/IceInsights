import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function PlayerPage() {
  const { playerId } = useParams();
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/player/${playerId}/landing`)
      .then((response) => {
        setPlayerData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching player data:", error);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, [playerId]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
        <p className="text-xl font-semibold text-gray-700 animate-pulse">
          Loading player data...
        </p>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-red-300">
        <p className="text-xl font-semibold text-red-700">
          Error loading player data. Please try again later.
        </p>
      </div>
    );

  const {
    currentTeamAbbrev,
    firstName,
    lastName,
    position,
    fullTeamName,
    headshot,
    birthDate,
    birthCountry,
    heightInInches,
    weightInPounds,
    shootsCatches,
    draftDetails,
    careerTotals,
  } = playerData;

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

  const teamColor = teamColors[currentTeamAbbrev] || "bg-gray-700"; // Default to gray if team color isn't found

  return (
    <div
      className={`${teamColor} min-h-screen from-gray-100 to-gray-300 py-12`}
    >
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Player Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white">
            {firstName.default} {lastName.default}
          </h1>
        </div>

        {/* Player Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            {/* Player Headshot and Basic Info */}
            <div className="text-center">
              <img
                src={headshot}
                alt={`${firstName.default} ${lastName.default}`}
                className="h-56 w-56 mx-auto rounded-full border-4 border-blue-500 shadow-md"
              />
              <h2 className="mt-6 text-3xl font-bold text-gray-800">
              {position === "L" || position === "R"
                      ? `${position}W`
                      : position}
              </h2>
              <p className="text-xl text-gray-600 mt-2">
                {fullTeamName.default}
              </p>
            </div>

            {/* Personal Details */}
            <div className="mt-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Personal Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <p>
                  <strong className="text-blue-600">Birth Date:</strong>{" "}
                  {birthDate}
                </p>
                <p>
                  <strong className="text-blue-600">Nationality:</strong>{" "}
                  {birthCountry}
                </p>
                <p>
                  <strong className="text-blue-600">Height:</strong>{" "}
                  {Math.floor(heightInInches / 12) +
                    "'" +
                    (heightInInches % 12)}
                </p>
                <p>
                  <strong className="text-blue-600">Weight:</strong>{" "}
                  {weightInPounds} lbs
                </p>
              </div>
            </div>

            <div className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <p>
                  <strong className="text-blue-600">Draft Year:</strong>{" "}
                  {draftDetails.year}
                </p>
                <p>
                  <strong className="text-blue-600">Draft Team:</strong>{" "}
                  {draftDetails.teamAbbrev}
                </p>
                <p>
                  <strong className="text-blue-600">
                    Overall Draft Position:
                  </strong>{" "}
                  {draftDetails.overallPick}
                </p>
                <p>
                  <strong className="text-blue-600">
                    Shoots/Catches:
                  </strong>{" "}
                  {shootsCatches}
                </p>
              </div>
            </div>

            {/* Regular Season Stats */}
            <div className="mt-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Career Regular Season
              </h3>
              {position === "G" ? (
                /* Goalie Stats */
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-gray-700">
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <strong className="text-blue-600">Games Played</strong>
                    <p>{careerTotals.regularSeason.gamesPlayed}</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <strong className="text-blue-600">Wins</strong>
                    <p>{careerTotals.regularSeason.wins}</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <strong className="text-blue-600">Save %</strong>
                    <p>{careerTotals.regularSeason.savePctg.toFixed(3)}</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <strong className="text-blue-600">GAA</strong>
                    <p>
                      {careerTotals.regularSeason.goalsAgainstAvg.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <strong className="text-blue-600">Shutouts</strong>
                    <p>{careerTotals.regularSeason.shutouts}</p>
                  </div>
                </div>
              ) : (
                /* Skater Stats */
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-gray-700">
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <strong className="text-blue-600">Games Played</strong>
                    <p>{careerTotals.regularSeason.gamesPlayed}</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <strong className="text-blue-600">Goals</strong>
                    <p>{careerTotals.regularSeason.goals}</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <strong className="text-blue-600">Assists</strong>
                    <p>{careerTotals.regularSeason.assists}</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <strong className="text-blue-600">Points</strong>
                    <p>{careerTotals.regularSeason.points}</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <strong className="text-blue-600">+/-</strong>
                    <p>{careerTotals.regularSeason.plusMinus}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Playoff Stats */}
            <div className="mt-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Career Playoffs
              </h3>
              {position === "G" ? (
                /* Goalie Stats */
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-gray-700">
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <strong className="text-blue-600">Games Played</strong>
                    <p>
                      {careerTotals.playoffs != null
                        ? careerTotals.playoffs.gamesPlayed
                        : 0}
                    </p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <strong className="text-blue-600">Wins</strong>
                    <p>
                      {careerTotals.playoffs != null
                        ? careerTotals.playoffs.wins
                        : 0}
                    </p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <strong className="text-blue-600">Save %</strong>
                    <p>
                      {careerTotals.playoffs != null
                        ? careerTotals.playoffs.savePctg.toFixed(3)
                        : 0}
                    </p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <strong className="text-blue-600">GAA</strong>
                    <p>
                      {careerTotals.playoffs != null
                        ? careerTotals.playoffs.goalsAgainstAvg.toFixed(2)
                        : 0}
                    </p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <strong className="text-blue-600">Shutouts</strong>
                    <p>
                      {careerTotals.playoffs != null
                        ? careerTotals.playoffs.shutouts
                        : 0}
                    </p>
                  </div>
                </div>
              ) : (
                /* Skater Stats */
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-gray-700">
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <strong className="text-blue-600">Games Played</strong>
                    <p>
                      {careerTotals.playoffs != null
                        ? careerTotals.playoffs.gamesPlayed
                        : 0}
                    </p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <strong className="text-blue-600">Goals</strong>
                    <p>
                      {careerTotals.playoffs != null
                        ? careerTotals.playoffs.goals
                        : 0}
                    </p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <strong className="text-blue-600">Assists</strong>
                    <p>
                      {careerTotals.playoffs != null
                        ? careerTotals.playoffs.assists
                        : 0}
                    </p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <strong className="text-blue-600">Points</strong>
                    <p>
                      {careerTotals.playoffs != null
                        ? careerTotals.playoffs.points
                        : 0}
                    </p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <strong className="text-blue-600">+/-</strong>
                    <p>
                      {careerTotals.playoffs != null
                        ? careerTotals.playoffs.plusMinus
                        : 0}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PlayerPage;
