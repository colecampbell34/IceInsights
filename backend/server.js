const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Route to fetch standings data from NHL API
app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api-web.nhle.com/v1/standings/now');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching NHL standings:', error);
    res.status(500).json({ error: 'Failed to fetch NHL standings' });
  }
});

// Route to fetch roster for a specific team
app.get('/api/roster/:teamAbbrev/:season', async (req, res) => {
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
app.get('/api/player/:playerID/landing', async (req, res) => {
  const { playerID } = req.params;
  try {
    const response = await axios.get(`https://api-web.nhle.com/v1/player/${playerID}/landing`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching NHL roster:', error);
    res.status(500).json({ error: 'Failed to fetch player profile' });
  }
});

// Serve React static files
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// Catch-all route (must be last)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
