import React, { useEffect, useState } from "react";
import axios from "axios";

function GamePredictor() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed
    const day = today.getDate().toString().padStart(2, "0"); // Get day as 2 digits
    return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
  });
  const [minDate, setMinDate] = useState(selectedDate); // Store the initial current date
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
    setSelectedDate(e.target.value); // Update the selected date
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
      const response = await axios.get(
        `http://localhost:8000/api/predict-game?team1=${homeTeam}&team2=${awayTeam}`
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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700">
        <p className="text-xl font-semibold text-white animate-pulse">
          Loading schedule...
        </p>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-900 to-red-700">
        <p className="text-xl font-semibold text-white">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 p-6">
      <h1 className="text-4xl font-bold text-center text-white mb-6">
        Game Predictor
      </h1>
      <p className="text-center text-gray-300 mb-4">
        Select a game to see predictions.
      </p>

      {/* Date Selection */}
      <div className="text-center mb-8">
        <label htmlFor="gameDate" className="mr-2 font-semibold text-gray-300">
          Select Date:
        </label>
        <input
          type="date"
          id="gameDate"
          value={selectedDate}
          min={minDate} // Use the initial current date as the min value
          onChange={handleDateChange}
          className="border px-3 py-1 rounded-md bg-gray-800 text-white"
        />
      </div>

      <div className="overflow-x-auto">
        {games.length === 0 ? (
          <p className="text-center text-gray-400">No games scheduled for this date.</p>
        ) : (
          <table className="min-w-full bg-gradient-to-br from-gray-800 to-gray-700 text-white rounded-lg shadow-lg">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                  Time (PST)
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                  Away Team
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                  Home Team
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                  Venue
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {games.map((game) => (
                <tr key={game.id} className="hover:bg-gray-800 transition duration-150 ease-in-out">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatTime(game.startTimeUTC)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={game.awayTeam.logo}
                        alt={game.awayTeam.abbrev}
                        className="h-8 w-8 mr-2"
                      />
                      <span>{game.awayTeam.placeName.default}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={game.homeTeam.logo}
                        alt={game.homeTeam.abbrev}
                        className="h-8 w-8 mr-2"
                      />
                      <span>{game.homeTeam.placeName.default}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {game.venue.default}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out"
                      onClick={() =>
                        fetchPrediction(game.homeTeam.abbrev, game.awayTeam.abbrev)
                      }
                    >
                      Load Prediction
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {loadingPrediction && (
        <p className="text-center text-gray-300 mt-4">Loading prediction...</p>
      )}
      {predictionError && (
        <p className="text-center text-red-400 mt-4">{predictionError}</p>
      )}
      {prediction && (
        <div className="mt-8 p-6 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-2xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Game Prediction</h2>
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <p className="text-xl text-blue-400 font-semibold">
              <strong>Predicted Winner:</strong> {prediction.predictedWinner}
            </p>
            <p className="text-xl text-green-400 font-semibold mt-2">
              <strong>Predicted Score:</strong> {prediction.predictedScore}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default GamePredictor;