// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
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

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading player data.</p>;

//   const { fullName, primaryPosition, currentTeam, headshotUrl } = playerData;

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-3/4">
//         <img
//           src={headshotUrl}
//           alt={fullName}
//           className="h-48 w-48 mx-auto rounded-full mb-4"
//         />
//         <h1 className="text-3xl font-bold text-center">{fullName}</h1>
//         <p className="text-center text-lg">{primaryPosition.abbreviation}</p>
//         <p className="text-center text-lg">{currentTeam.name}</p>

//         {/* Display stats based on position */}
//         <h2 className="text-2xl font-semibold mt-8">Stats</h2>
//         {primaryPosition.abbreviation === "G" ? (
//           /* Goalie Stats */
//           <div className="mt-4">
//             <p>
//               <strong>Games Played:</strong> {playerData.stats.gamesPlayed}
//             </p>
//             <p>
//               <strong>Wins:</strong> {playerData.stats.wins}
//             </p>
//             <p>
//               <strong>Save Percentage:</strong> {playerData.stats.savePercentage}
//             </p>
//             <p>
//               <strong>Goals Against Average:</strong>{" "}
//               {playerData.stats.goalsAgainstAverage}
//             </p>
//             <p>
//               <strong>Shutouts:</strong> {playerData.stats.shutouts}
//             </p>
//           </div>
//         ) : (
//           /* Skater Stats */
//           <div className="mt-4">
//             <p>
//               <strong>Games Played:</strong> {playerData.stats.gamesPlayed}
//             </p>
//             <p>
//               <strong>Goals:</strong> {playerData.stats.goals}
//             </p>
//             <p>
//               <strong>Assists:</strong> {playerData.stats.assists}
//             </p>
//             <p>
//               <strong>Points:</strong> {playerData.stats.points}
//             </p>
//             <p>
//               <strong>Plus/Minus:</strong> {playerData.stats.plusMinus}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default PlayerPage;





import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading player data.</p>;

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
    careerTotals
  } = playerData;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-3/4">
        {/* Player Headshot and Basic Info */}
        <img
          src={headshot}
          alt={firstName + " " + lastName}
          className="h-48 w-48 mx-auto rounded-full mb-4"
        />
        <h1 className="text-3xl font-bold text-center">{firstName + " " + lastName}</h1>
        <p className="text-center text-lg">{position}</p>
        <p className="text-center text-lg">{fullTeamName.default}</p>

        {/* Personal Details */}
        <h2 className="text-2xl font-semibold mt-8">Personal Details</h2>
        <div className="mt-4">
          <p>
            <strong>Birth Date:</strong> {birthDate}
          </p>
          <p>
            <strong>Nationality:</strong> {birthCountry}
          </p>
          <p>
            <strong>Height:</strong> {(heightInInches / 12) + "'" + heightInInches % 12}
          </p>
          <p>
            <strong>Weight:</strong> {weightInPounds} lbs
          </p>
        </div>

        {/* Draft Information */}
        {draftDetails.year && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Draft Information</h2>
            <p>
              <strong>Draft Year:</strong> {draftDetails.year}
            </p>
            <p>
              <strong>Draft Team:</strong> {draftDetails.teamAbbrev}
            </p>
            <p>
              <strong>Overall Draft Position:</strong> {draftDetails.overallPick}
            </p>
          </div>
        )}

        {/* Player Stats */}
        <h2 className="text-2xl font-semibold mt-8">Stats</h2>
        {position === "G" ? (
          /* Goalie Stats */
          <div className="mt-4">
            <p>
              <strong>Games Played:</strong> {careerTotals.gamesPlayed}
            </p>
            <p>
              <strong>Wins:</strong> {careerTotals.wins}
            </p>
            <p>
              <strong>Save Percentage:</strong> {careerTotals.savePercentage}
            </p>
            <p>
              <strong>Goals Against Average:</strong> {careerTotals.goalsAgainstAverage}
            </p>
            <p>
              <strong>Shutouts:</strong> {careerTotals.shutouts}
            </p>
          </div>
        ) : (
            // NEED TO FIX THIS NOT ALL STATS ARE SHOWING
          /* Skater Stats */
          <div className="mt-4">
            <p>
              <strong>Games Played:</strong> {careerTotals.gamesPlayed}
            </p>
            <p>
              <strong>Goals:</strong> {careerTotals.goals}
            </p>
            <p>
              <strong>Assists:</strong> {careerTotals.assists}
            </p>
            <p>
              <strong>Points:</strong> {careerTotals.points}
            </p>
            <p>
              <strong>Plus/Minus:</strong> {careerTotals.plusMinus}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayerPage;
