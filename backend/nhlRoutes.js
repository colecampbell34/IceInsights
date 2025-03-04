const express = require('express');
const axios = require('axios');

const router = express.Router();

// Route to fetch standings data from NHL API
router.get('/standings', async (req, res) => {
  try {
    const response = await axios.get('https://api-web.nhle.com/v1/standings/now');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching NHL standings:', error);
    res.status(500).json({ error: 'Failed to fetch NHL standings' });
  }
});

// Route to fetch roster for a specific team
router.get('/roster/:teamAbbrev/:season', async (req, res) => {
  const { teamAbbrev, season } = req.params;
  try {
    const response = await axios.get(`https://api-web.nhle.com/v1/roster/${teamAbbrev}/${season}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching NHL roster:', error);
    res.status(500).json({ error: 'Failed to fetch NHL roster' });
  }
});

// Route to fetch stats for a specific player
router.get('/player/:playerID/landing', async (req, res) => {
  const { playerID } = req.params;
  try {
    const response = await axios.get(`https://api-web.nhle.com/v1/player/${playerID}/landing`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching NHL player stats:', error);
    res.status(500).json({ error: 'Failed to fetch player profile' });
  }
});

// Route to fetch schedule data from NHL API
router.get('/predictor', async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: 'Date parameter is required' });
  }

  try {
    const response = await axios.get(`https://api-web.nhle.com/v1/schedule/${date}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching NHL schedule:', error);
    res.status(500).json({ error: 'Failed to fetch NHL schedule' });
  }
});

// Route to predict game outcome between two teams
router.post('/predict', async (req, res) => {
  const { team1, team2 } = req.body;

  if (!team1 || !team2) {
    return res.status(400).json({ error: 'Both team abbreviations are required' });
  }

  try {
    // Fetch data for both teams
    const team1Stats = await axios.get(`https://api-web.nhle.com/v1/standings/now`);
    const team2Stats = await axios.get(`https://api-web.nhle.com/v1/standings/now`);

    // Extract relevant data for prediction (e.g., recent record, home/away performance)
    const team1Data = team1Stats.data.standings.find(t => t.teamAbbrev === team1);
    const team2Data = team2Stats.data.standings.find(t => t.teamAbbrev === team2);

    if (!team1Data || !team2Data) {
      return res.status(404).json({ error: 'One or both teams not found' });
    }

    // Basic prediction logic (can be improved later)
    let prediction;
    if (team1Data.points > team2Data.points) {
      prediction = `${team1} is more likely to win based on points.`;
    } else if (team2Data.points > team1Data.points) {
      prediction = `${team2} is more likely to win based on points.`;
    } else {
      prediction = `It's a close matchup between ${team1} and ${team2}.`;
    }

    res.json({
      team1: team1Data.teamAbbrev,
      team2: team2Data.teamAbbrev,
      prediction,
    });
  } catch (error) {
    console.error('Error predicting game outcome:', error);
    res.status(500).json({ error: 'Failed to predict game outcome' });
  }
});

module.exports = router;
