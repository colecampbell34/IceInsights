// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// function TeamPage() {
//   const { teamAbbrev } = useParams(); // Get team abbreviation from URL params
//   const [team, setTeam] = useState(null);
//   const [roster, setRoster] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch team details
//     // axios
//     //   .get(`http://localhost:8000/team/${teamAbbrev}`)
//     //   .then((response) => {
//     //     setTeam(response.data);
//     //   })
//     //   .catch((error) => {
//     //     console.error("Error fetching team data:", error);
//     //     setError(error);
//     //   });

//     // Fetch roster details
//     axios
//       .get(`http://localhost:8000/api/roster/${teamAbbrev}/20242025`) // Fetch the roster for the 2023-2024 season
//       .then((response) => {
//         setRoster(response.data.forwards); // Assuming roster data is in the "forwards" key
//       })
//       .catch((error) => {
//         console.error("Error fetching roster data:", error);
//         setError(error);
//       })
//       .finally(() => setLoading(false)); // Stop loading once all data is fetched
//   }, [teamAbbrev]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading data.</p>;

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-100">
//       {/* Display team information */}
//       {/* <header className="w-full text-white text-center py-6" style={{ backgroundColor: team.teamColour || "#333" }}>
//         <img src={team.teamLogo} alt={team.teamName.default} className="h-32 mx-auto" />
//         <h1 className="text-4xl font-bold mt-2">{team.teamName.default}</h1>
//         <p className="text-lg">{team.conferenceName} Conference - {team.divisionName} Division</p>
//         <p className="text-lg">{team.gamesPlayed} GP | {team.wins} W - {team.losses} L - {team.otLosses} OT | {team.points} PTS</p>
//       </header> */}

//       {/* Display roster */}
//       <section className="w-full px-6 py-4">
//         <h2 className="text-2xl font-semibold text-center mb-6">Roster</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {roster.map((player) => (
//             <div key={player.id} className="bg-white p-4 rounded-lg shadow-md">
//               <img src={player.headshot} alt={`${player.firstName.default} ${player.lastName.default}`} className="h-32 w-32 mx-auto rounded-full" />
//               <h3 className="text-xl font-medium text-center mt-4">{player.firstName.default} {player.lastName.default}</h3>
//               <p className="text-center">{player.positionCode}</p>
//               <p className="text-center">{player.sweaterNumber}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

// export default TeamPage;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// function TeamPage() {
//   const { teamAbbrev } = useParams(); // Get team abbreviation from URL params
//   const [roster, setRoster] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8000/api/roster/${teamAbbrev}/20242025`) // Adjust the season as needed
//       .then((response) => {
//         // Combine all player categories into a single array
//         const allPlayers = [
//           ...(response.data.forwards || []),
//           ...(response.data.defensemen || []),
//           ...(response.data.goalies || []),
//         ];
//         setRoster(allPlayers);
//       })
//       .catch((error) => {
//         console.error("Error fetching roster data:", error);
//         setError(error);
//       })
//       .finally(() => setLoading(false));
//   }, [teamAbbrev]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading data.</p>;

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-100">
//       {/* Display roster */}
//       <section className="w-full px-6 py-4">
//         <h2 className="text-2xl font-semibold text-center mb-6">Roster</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {roster.map((player) => (
//             <div key={player.id} className="bg-white p-4 rounded-lg shadow-md">
//               <img
//                 src={player.headshot}
//                 alt={`${player.firstName.default} ${player.lastName.default}`}
//                 className="h-32 w-32 mx-auto rounded-full"
//               />
//               <h3 className="text-xl font-medium text-center mt-4">
//                 {player.firstName.default} {player.lastName.default}
//               </h3>
//               <p className="text-center">{player.positionCode}</p>
//               <p className="text-center">#{player.sweaterNumber}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

// export default TeamPage;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios, { all } from "axios";

function TeamPage() {
  const { teamAbbrev } = useParams();
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <section className="w-full px-6 py-4">
        <h2 className="text-2xl font-semibold text-center mb-6">Roster</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {roster.map((player) => (
            <Link
              key={player.id}
              to={`/player/${player.id}`}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <img
                src={player.headshot}
                alt={`${player.firstName.default} ${player.lastName.default}`}
                className="h-32 w-32 mx-auto rounded-full"
              />
              <h3 className="text-xl font-medium text-center mt-4">
                {player.firstName.default} {player.lastName.default}
              </h3>
              <p className="text-center">{player.positionCode}</p>
              <p className="text-center">#{player.sweaterNumber}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default TeamPage;
