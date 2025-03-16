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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700">
        <p className="text-xl font-semibold text-white animate-pulse">
          Loading player data...
        </p>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-900 to-red-700">
        <p className="text-xl font-semibold text-white">
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
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 to-gray-700`}>
      <header
        className={`w-full py-16 text-white text-center ${teamColor} shadow-2xl`}
      >
        <h1 className="text-5xl font-bold mb-4">
          {firstName.default} {lastName.default}
        </h1>
        <p className="text-2xl text-gray-200">
          {position === "L" || position === "R" ? `${position}W` : position} |{" "}
          {fullTeamName.default}
        </p>
      </header>

      <section className="w-full px-6 py-12 bg-opacity-90 bg-gray-800 shadow-2xl rounded-t-3xl max-w-7xl mx-auto -mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Player Headshot and Basic Info */}
          <div className="text-center">
            <img
              src={headshot}
              alt={`${firstName.default} ${lastName.default}`}
              className="h-64 w-64 mx-auto rounded-full border-4 border-blue-500 shadow-lg"
            />
            <div className="mt-6">
              <h2 className="text-3xl font-bold text-white">
                {firstName.default} {lastName.default}
              </h2>
              <p className="text-xl text-gray-300 mt-2">
                {position === "L" || position === "R" ? `${position}W` : position}
              </p>
              <p className="text-xl text-gray-300">{fullTeamName.default}</p>
            </div>
          </div>

          {/* Personal Details */}
          <div className="bg-gray-700 p-8 rounded-lg shadow-lg">
            <h3 className="text-3xl font-bold text-white mb-6">
              Personal Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
              <p>
                <strong className="text-blue-400">Birth Date:</strong> {birthDate}
              </p>
              <p>
                <strong className="text-blue-400">Nationality:</strong>{" "}
                {birthCountry}
              </p>
              <p>
                <strong className="text-blue-400">Height:</strong>{" "}
                {Math.floor(heightInInches / 12) + "'" + (heightInInches % 12)}
              </p>
              <p>
                <strong className="text-blue-400">Weight:</strong>{" "}
                {weightInPounds} lbs
              </p>
              <p>
                <strong className="text-blue-400">Shoots/Catches:</strong>{" "}
                {shootsCatches}
              </p>
              <p>
                <strong className="text-blue-400">Draft Year:</strong>{" "}
                {draftDetails ? draftDetails.year : "Undrafted"}
              </p>
              <p>
                <strong className="text-blue-400">Draft Team:</strong>{" "}
                {draftDetails ? draftDetails.teamAbbrev : "Undrafted"}
              </p>
              <p>
                <strong className="text-blue-400">
                  Overall Draft Position:
                </strong>{" "}
                {draftDetails ? draftDetails.overallPick : "Undrafted"}
              </p>
            </div>
          </div>
        </div>

        {/* Career Stats */}
        <div className="mt-12">
          <h3 className="text-3xl font-bold text-white mb-6">
            Career Regular Season
          </h3>
          {position === "G" ? (
            /* Goalie Stats */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {[
                ["Games Played", careerTotals.regularSeason.gamesPlayed],
                ["Wins", careerTotals.regularSeason.wins],
                ["Save %", careerTotals.regularSeason.savePctg.toFixed(3)],
                ["GAA", careerTotals.regularSeason.goalsAgainstAvg.toFixed(2)],
                ["Shutouts", careerTotals.regularSeason.shutouts],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="bg-gray-700 p-4 rounded-lg shadow-lg text-center"
                >
                  <strong className="text-blue-400">{label}</strong>
                  <p className="text-white">{value}</p>
                </div>
              ))}
            </div>
          ) : (
            /* Skater Stats */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {[
                ["Games Played", careerTotals.regularSeason.gamesPlayed],
                ["Goals", careerTotals.regularSeason.goals],
                ["Assists", careerTotals.regularSeason.assists],
                ["Points", careerTotals.regularSeason.points],
                ["+/-", careerTotals.regularSeason.plusMinus],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="bg-gray-700 p-4 rounded-lg shadow-lg text-center"
                >
                  <strong className="text-blue-400">{label}</strong>
                  <p className="text-white">{value}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Playoff Stats */}
        <div className="mt-12">
          <h3 className="text-3xl font-bold text-white mb-6">
            Career Playoffs
          </h3>
          {position === "G" ? (
            /* Goalie Stats */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {[
                [
                  "Games Played",
                  careerTotals.playoffs ? careerTotals.playoffs.gamesPlayed : 0,
                ],
                ["Wins", careerTotals.playoffs ? careerTotals.playoffs.wins : 0],
                [
                  "Save %",
                  careerTotals.playoffs
                    ? careerTotals.playoffs.savePctg.toFixed(3)
                    : 0,
                ],
                [
                  "GAA",
                  careerTotals.playoffs
                    ? careerTotals.playoffs.goalsAgainstAvg.toFixed(2)
                    : 0,
                ],
                [
                  "Shutouts",
                  careerTotals.playoffs ? careerTotals.playoffs.shutouts : 0,
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="bg-gray-700 p-4 rounded-lg shadow-lg text-center"
                >
                  <strong className="text-blue-400">{label}</strong>
                  <p className="text-white">{value}</p>
                </div>
              ))}
            </div>
          ) : (
            /* Skater Stats */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {[
                [
                  "Games Played",
                  careerTotals.playoffs ? careerTotals.playoffs.gamesPlayed : 0,
                ],
                [
                  "Goals",
                  careerTotals.playoffs ? careerTotals.playoffs.goals : 0,
                ],
                [
                  "Assists",
                  careerTotals.playoffs ? careerTotals.playoffs.assists : 0,
                ],
                [
                  "Points",
                  careerTotals.playoffs ? careerTotals.playoffs.points : 0,
                ],
                [
                  "+/-",
                  careerTotals.playoffs ? careerTotals.playoffs.plusMinus : 0,
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="bg-gray-700 p-4 rounded-lg shadow-lg text-center"
                >
                  <strong className="text-blue-400">{label}</strong>
                  <p className="text-white">{value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default PlayerPage;