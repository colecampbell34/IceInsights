// const express = require('express');
// const axios = require('axios');

// const router = express.Router();

// // Route to fetch standings data from NHL API
// router.get('/standings', async (req, res) => {
//   try {
//     const response = await axios.get('https://api-web.nhle.com/v1/standings/now');
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error fetching NHL standings:', error);
//     res.status(500).json({ error: 'Failed to fetch NHL standings' });
//   }
// });

// // Route to fetch roster for a specific team
// router.get('/roster/:teamAbbrev/:season', async (req, res) => {
//   const { teamAbbrev, season } = req.params;
//   try {
//     const response = await axios.get(`https://api-web.nhle.com/v1/roster/${teamAbbrev}/${season}`);
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error fetching NHL roster:', error);
//     res.status(500).json({ error: 'Failed to fetch NHL roster' });
//   }
// });

// // Route to fetch stats for a specific player
// router.get('/player/:playerID/landing', async (req, res) => {
//   const { playerID } = req.params;
//   try {
//     const response = await axios.get(`https://api-web.nhle.com/v1/player/${playerID}/landing`);
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error fetching NHL player stats:', error);
//     res.status(500).json({ error: 'Failed to fetch player profile' });
//   }
// });

// // Route to fetch schedule data
// router.get('/predictor', async (req, res) => {
//   const { date } = req.query;

//   if (!date) {
//     return res.status(400).json({ error: 'Date parameter is required' });
//   }

//   try {
//     const response = await axios.get(`https://api-web.nhle.com/v1/schedule/${date}`);
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error fetching NHL schedule:', error);
//     res.status(500).json({ error: 'Failed to fetch NHL schedule' });
//   }
// });

// // Route to predict game outcome between two teams
// router.post('/predict', async (req, res) => {
//   const { homeTeam, awayTeam } = req.body;

//   if (!homeTeam || !awayTeam) {
//     return res.status(400).json({ error: 'Both team abbreviations are required' });
//   }

//   try {
//     const response = await axios.get('https://api-web.nhle.com/v1/standings/now');
//     const standings = response.data.standings;

//     const homeTeamData = standings.find(team => team.teamAbbrev.default === homeTeam);
//     const awayTeamData = standings.find(team => team.teamAbbrev.default === awayTeam);

//     if (!homeTeamData || !awayTeamData) {
//       return res.status(404).json({ error: 'One or both teams not found' });
//     }

//     let prediction = "It's a close matchup.";
//     if (homeTeamData.points > awayTeamData.points) {
//       prediction = `${homeTeam} is more likely to win.`;
//     } else if (awayTeamData.points > homeTeamData.points) {
//       prediction = `${awayTeam} is more likely to win.`;
//     }

//     res.json({ prediction });
//   } catch (error) {
//     console.error('Error predicting game outcome:', error);
//     res.status(500).json({ error: 'Failed to predict game outcome' });
//   }
// });

// module.exports = router;

const express = require("express");
const axios = require("axios");

const router = express.Router();
const NHL_API_BASE_URL = "https://api-web.nhle.com/v1";

// Route to fetch standings data from NHL API
router.get("/standings", async (req, res) => {
  try {
    const response = await axios.get(`${NHL_API_BASE_URL}/standings/now`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching NHL standings:", error);
    res.status(500).json({ error: "Failed to fetch NHL standings" });
  }
});

// Route to fetch roster for a specific team
router.get("/roster/:teamAbbrev/:season", async (req, res) => {
  const { teamAbbrev, season } = req.params;
  try {
    const response = await axios.get(
      `${NHL_API_BASE_URL}/roster/${teamAbbrev}/${season}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching NHL roster:", error);
    res.status(500).json({ error: "Failed to fetch NHL roster" });
  }
});

// Route to fetch stats for a specific player
router.get("/player/:playerID/landing", async (req, res) => {
  const { playerID } = req.params;
  try {
    const response = await axios.get(
      `${NHL_API_BASE_URL}/player/${playerID}/landing`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching NHL player stats:", error);
    res.status(500).json({ error: "Failed to fetch player profile" });
  }
});

// Route to fetch schedule data for prediction page
router.get("/predictor", async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: "Date parameter is required" });
  }

  try {
    const response = await axios.get(
      `https://api-web.nhle.com/v1/schedule/${date}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching NHL schedule:", error);
    res.status(500).json({ error: "Failed to fetch NHL schedule" });
  }
});

// Helper function to fetch team stats for prediction
const fetchTeamStats = async (teamAbbr) => {
  try {
    const response = await axios.get(`${NHL_API_BASE_URL}/standings/now`);
    const teams = response.data.standings;

    const teamStats = teams.find(
      (team) => team.teamAbbrev.default === teamAbbr
    );
    return teamStats || null;
  } catch (error) {
    console.error(`Error fetching stats for ${teamAbbr}:`, error.message);
    return null;
  }
};

// Prediction logic
const predictOutcome = (team1Stats, team2Stats) => {
  if (!team1Stats || !team2Stats) {
    return { error: "Could not retrieve team data." };
  }

  // Example prediction logic (can be improved later) TODO
  const winProbability1 =
    team1Stats.wins / (team1Stats.wins + team1Stats.losses);
  const winProbability2 =
    team2Stats.wins / (team2Stats.wins + team2Stats.losses);

  const predictedWinner =
    winProbability1 > winProbability2
      ? team1Stats.teamName.default
      : team2Stats.teamName.default;
  const score1 = Math.floor(Math.random() * 3) + 2; // Simulated score (improve later)
  const score2 = Math.floor(Math.random() * 3) + 2;

  return {
    predictedWinner,
    predictedScore: `${score1}-${score2}`,
  };
};

// Route to initiate prediction logic
router.get("/predict-game", async (req, res) => {
  const { team1, team2 } = req.query;

  if (!team1 || !team2) {
    return res
      .status(400)
      .json({ error: "Missing team1 or team2 query parameters" });
  }

  const team1Stats = await fetchTeamStats(team1);
  const team2Stats = await fetchTeamStats(team2);

  const prediction = predictOutcome(team1Stats, team2Stats);
  res.json(prediction);
});

module.exports = router;
