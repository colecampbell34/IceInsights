// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function GamePredictor() {
//   const [games, setGames] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); // Default to today
//   const [prediction, setPrediction] = useState(null);
//   const [loadingPrediction, setLoadingPrediction] = useState(false);
//   const [predictionError, setPredictionError] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     setError(null);
//     axios
//       .get(`http://localhost:8000/api/predictor?date=${selectedDate}`)
//       .then((response) => {
//         setGames(response.data.gameWeek[0]?.games || []); // Handle missing data
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching schedule:", error);
//         setError("Failed to load games.");
//         setLoading(false);
//       });
//   }, [selectedDate]); // Re-fetch when the date changes

//   const handleDateChange = (e) => {
//     setSelectedDate(e.target.value);
//   };

//   const formatTime = (utcTime) => {
//     const date = new Date(utcTime);
//     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
//   };

//   const fetchPrediction = async (homeTeam, awayTeam) => {
//     setLoadingPrediction(true);
//     setPredictionError(null);
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/api/predict?homeTeam=${homeTeam}&awayTeam=${awayTeam}`
//       );
//       setPrediction(response.data);
//     } catch (error) {
//       console.error("Error fetching prediction:", error);
//       setPredictionError("Failed to load prediction.");
//     } finally {
//       setLoadingPrediction(false);
//     }
//   };

//   if (loading) return <p className="text-center">Loading schedule...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">Game Predictor</h1>
//       <p className="text-center mb-4">Select a game to see predictions.</p>

//       {/* Date Selection */}
//       <div className="text-center mb-4">
//         <label htmlFor="gameDate" className="mr-2 font-semibold">Select Date:</label>
//         <input
//           type="date"
//           id="gameDate"
//           value={selectedDate}
//           min={new Date().toISOString().split("T")[0]} // Prevent selecting past dates
//           onChange={handleDateChange}
//           className="border px-3 py-1 rounded-md"
//         />
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         {games.length === 0 ? (
//           <p className="text-center">No games scheduled for this date.</p>
//         ) : (
//           <table className="min-w-full bg-white border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border px-4 py-2">Time (PST)</th>
//                 <th className="border px-4 py-2">Away Team</th>
//                 <th className="border px-4 py-2">Home Team</th>
//                 <th className="border px-4 py-2">Venue</th>
//                 <th className="border px-4 py-2">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {games.map((game) => (
//                 <tr key={game.id} className="text-center">
//                   {/* Start Time */}
//                   <td className="border px-4 py-2">{formatTime(game.startTimeUTC)}</td>
//                   {/* Away Team */}
//                   <td className="border px-4 py-2">
//                     <div className="flex items-center justify-center">
//                       <img src={game.awayTeam.logo} alt={game.awayTeam.abbrev} className="h-8 mr-2" />
//                       <span>{game.awayTeam.placeName.default}</span>
//                     </div>
//                   </td>
//                   {/* Home Team */}
//                   <td className="border px-4 py-2">
//                     <div className="flex items-center justify-center">
//                       <img src={game.homeTeam.logo} alt={game.homeTeam.abbrev} className="h-8 mr-2" />
//                       <span>{game.homeTeam.placeName.default}</span>
//                     </div>
//                   </td>
//                   {/* Venue */}
//                   <td className="border px-4 py-2">{game.venue.default}</td>
//                   {/* Action Button */}
//                   <td className="border px-4 py-2">
//                     <button
//                       className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
//                       onClick={() => fetchPrediction(game.homeTeam.abbrev, game.awayTeam.abbrev)}
//                     >
//                       View Prediction
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* Prediction Result */}
//       {loadingPrediction && <p className="text-center mt-4">Loading prediction...</p>}
//       {predictionError && <p className="text-center text-red-500 mt-4">{predictionError}</p>}
//       {prediction && (
//         <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
//           <h2 className="text-xl font-bold text-center">Game Prediction</h2>
//           <div className="flex justify-center mt-2">
//             <div className="text-center">
//               <img src={prediction.awayTeam.logo} alt={prediction.awayTeam.abbrev} className="h-12 mx-auto" />
//               <p className="font-semibold">{prediction.awayTeam.abbrev}</p>
//               <p>Record: {prediction.awayTeam.record.wins}-{prediction.awayTeam.record.losses}</p>
//             </div>
//             <div className="text-center mx-4 text-lg font-bold">vs</div>
//             <div className="text-center">
//               <img src={prediction.homeTeam.logo} alt={prediction.homeTeam.abbrev} className="h-12 mx-auto" />
//               <p className="font-semibold">{prediction.homeTeam.abbrev}</p>
//               <p>Record: {prediction.homeTeam.record.wins}-{prediction.homeTeam.record.losses}</p>
//             </div>
//           </div>
//           <p className="text-center mt-4">Head-to-Head: {prediction.headToHead.recentGames.length} recent games</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default GamePredictor;

import React, { useEffect, useState } from "react";
import axios from "axios";

function GamePredictor() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [prediction, setPrediction] = useState(null);
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const [predictionError, setPredictionError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(`http://localhost:8000/api/predictor?date=${selectedDate}`)
      .then((response) => {
        setGames(response.data.gameWeek[0]?.games || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching schedule:", error);
        setError("Failed to load games.");
        setLoading(false);
      });
  }, [selectedDate]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const formatTime = (utcTime) => {
    const date = new Date(utcTime);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const fetchPrediction = async (homeTeam, awayTeam) => {
    setLoadingPrediction(true);
    setPredictionError(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/predict",
        { homeTeam, awayTeam }, // Send JSON body correctly
        { headers: { "Content-Type": "application/json" } } // Explicitly set header
      );

      setPrediction(response.data);
    } catch (error) {
      console.error(
        "Error fetching prediction:",
        error.response?.data || error.message
      );
      setPredictionError("Failed to load prediction.");
    } finally {
      setLoadingPrediction(false);
    }
  };

  if (loading) return <p className="text-center">Loading schedule...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Game Predictor</h1>
      <p className="text-center mb-4">Select a game to see predictions.</p>

      {/* Date Selection */}
      <div className="text-center mb-4">
        <label htmlFor="gameDate" className="mr-2 font-semibold">
          Select Date:
        </label>
        <input
          type="date"
          id="gameDate"
          value={selectedDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={handleDateChange}
          className="border px-3 py-1 rounded-md"
        />
      </div>

      <div className="overflow-x-auto">
        {games.length === 0 ? (
          <p className="text-center">No games scheduled for this date.</p>
        ) : (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Time (PST)</th>
                <th className="border px-4 py-2">Away Team</th>
                <th className="border px-4 py-2">Home Team</th>
                <th className="border px-4 py-2">Venue</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => (
                <tr key={game.id} className="text-center">
                  <td className="border px-4 py-2">
                    {formatTime(game.startTimeUTC)}
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex items-center justify-center">
                      <img
                        src={game.awayTeam.logo}
                        alt={game.awayTeam.abbrev}
                        className="h-8 mr-2"
                      />
                      <span>{game.awayTeam.placeName.default}</span>
                    </div>
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex items-center justify-center">
                      <img
                        src={game.homeTeam.logo}
                        alt={game.homeTeam.abbrev}
                        className="h-8 mr-2"
                      />
                      <span>{game.homeTeam.placeName.default}</span>
                    </div>
                  </td>
                  <td className="border px-4 py-2">{game.venue.default}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
                      onClick={() =>
                        fetchPrediction(
                          game.homeTeam.abbrev,
                          game.awayTeam.abbrev
                        )
                      }
                    >
                      View Prediction
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {loadingPrediction && (
        <p className="text-center mt-4">Loading prediction...</p>
      )}
      {predictionError && (
        <p className="text-center text-red-500 mt-4">{predictionError}</p>
      )}
      {prediction && (
        <div className="mt-6 p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-bold text-center">Game Prediction</h2>
          <p className="text-center mt-4">{prediction.prediction}</p>
        </div>
      )}
    </div>
  );
}

export default GamePredictor;
