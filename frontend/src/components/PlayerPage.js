// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";

// function PlayerPage() {
//   const { playerId } = useParams();
//   const [playerData, setPlayerData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8000/api/player/${playerId}/landing`)
//       .then((response) => {
//         setPlayerData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching player data:", error);
//         setError(error);
//       })
//       .finally(() => setLoading(false));
//   }, [playerId]);

//   if (loading) return <p>Loading player data...</p>;
//   if (error) return <p>Error loading player data. Please try again later.</p>;

//   const {
//     firstName,
//     lastName,
//     position,
//     fullTeamName,
//     headshot,
//     birthDate,
//     birthCountry,
//     heightInInches,
//     weightInPounds,
//     draftDetails,
//     careerTotals,
//   } = playerData;

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-100">
//       <section className="w-full px-6 py-4">
//         <h1 className="text-3xl font-bold text-center mb-4">
//           Player: {firstName.default} {lastName.default}
//         </h1>
//         <Link
//           to={`/team/${fullTeamName.teamAbbrev}`}
//           className="text-blue-500 hover:underline mb-6 block text-center"
//         >
//           Back to {fullTeamName.default}
//         </Link>

//         <div className="bg-white p-8 rounded-lg shadow-md w-3/4">
//           {/* Player Headshot and Basic Info */}
//           <img
//             src={headshot}
//             alt={`${firstName.default} ${lastName.default}`}
//             className="h-48 w-48 mx-auto rounded-full mb-4"
//           />
//           <h2 className="text-2xl font-semibold text-center">{position}</h2>
//           <p className="text-center text-lg">{fullTeamName.default}</p>

//           {/* Personal Details */}
//           <h3 className="text-2xl font-semibold mt-8">Personal Details</h3>
//           <div className="mt-4">
//             <p>
//               <strong>Birth Date:</strong> {birthDate}
//             </p>
//             <p>
//               <strong>Nationality:</strong> {birthCountry}
//             </p>
//             <p>
//               <strong>Height:</strong>{" "}
//               {Math.floor(heightInInches / 12) + "'" + (heightInInches % 12)}
//             </p>
//             <p>
//               <strong>Weight:</strong> {weightInPounds} lbs
//             </p>
//           </div>

//           {/* Draft Information */}
//           {draftDetails?.year ? (
//             <div className="mt-8">
//               <h3 className="text-2xl font-semibold">Draft Information</h3>
//               <p>
//                 <strong>Draft Year:</strong> {draftDetails.year}
//               </p>
//               <p>
//                 <strong>Draft Team:</strong> {draftDetails.teamAbbrev}
//               </p>
//               <p>
//                 <strong>Overall Draft Position:</strong>{" "}
//                 {draftDetails.overallPick}
//               </p>
//             </div>
//           ) : (
//             <p className="mt-8 text-lg font-semibold">Undrafted</p>
//           )}

//           {/* Player Stats */}
//           <h3 className="text-2xl font-semibold mt-8">Career Stats</h3>
//           {position === "G" ? (
//             /* Goalie Stats */
//             <div className="mt-4">
//               <p>
//                 <strong>Games Played:</strong>{" "}
//                 {careerTotals.regularSeason.gamesPlayed}
//               </p>
//               <p>
//                 <strong>Wins:</strong> {careerTotals.regularSeason.wins}
//               </p>
//               <p>
//                 <strong>Save Percentage:</strong>{" "}
//                 {careerTotals.regularSeason.savePctg.toFixed(3)}
//               </p>
//               <p>
//                 <strong>Goals Against Average:</strong>{" "}
//                 {careerTotals.regularSeason.goalsAgainstAvg.toFixed(2)}
//               </p>
//               <p>
//                 <strong>Shutouts:</strong> {careerTotals.regularSeason.shutouts}
//               </p>
//             </div>
//           ) : (
//             /* Skater Stats */
//             <div className="mt-4">
//               <p>
//                 <strong>Games Played:</strong>{" "}
//                 {careerTotals.regularSeason.gamesPlayed}
//               </p>
//               <p>
//                 <strong>Goals:</strong> {careerTotals.regularSeason.goals}
//               </p>
//               <p>
//                 <strong>Assists:</strong> {careerTotals.regularSeason.assists}
//               </p>
//               <p>
//                 <strong>Points:</strong> {careerTotals.regularSeason.points}
//               </p>
//               <p>
//                 <strong>Plus/Minus:</strong>{" "}
//                 {careerTotals.regularSeason.plusMinus}
//               </p>
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }

// export default PlayerPage;







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
    firstName,
    lastName,
    position,
    fullTeamName,
    headshot,
    birthDate,
    birthCountry,
    heightInInches,
    weightInPounds,
    draftDetails,
    careerTotals,
  } = playerData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-12">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Player Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-gray-800 drop-shadow-sm">
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
                className="h-56 w-56 mx-auto rounded-full border-4 border-gray-200 shadow-md"
              />
              <h2 className="mt-6 text-3xl font-bold text-gray-800">
                {position}
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
                  {Math.floor(heightInInches / 12) + "'" + (heightInInches % 12)}
                </p>
                <p>
                  <strong className="text-blue-600">Weight:</strong>{" "}
                  {weightInPounds} lbs
                </p>
              </div>
            </div>

            {/* Draft Information */}
            {draftDetails?.year ? (
              <div className="mt-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">
                  Draft Information
                </h3>
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
                </div>
              </div>
            ) : (
              <p className="mt-8 text-xl font-semibold text-gray-700">
                Undrafted
              </p>
            )}

            {/* Player Stats */}
            <div className="mt-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Career Stats
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
                    <p>{careerTotals.regularSeason.goalsAgainstAvg.toFixed(2)}</p>
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
          </div>
        </div>
      </section>
    </div>
  );
}

export default PlayerPage;