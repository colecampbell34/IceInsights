const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// API routes (must come first!)
app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api-web.nhle.com/v1/standings/now');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching NHL teams:', error);
    res.status(500).json({ error: 'Failed to fetch NHL teams' });
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