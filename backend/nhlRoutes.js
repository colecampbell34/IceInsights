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
    const response = await axios.get(`${NHL_API_BASE_URL}/schedule/${date}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching NHL schedule:", error);
    res.status(500).json({ error: "Failed to fetch NHL schedule" });
  }
});

// Helper functions to fetch team stats for prediction
const fetchTeamStats = async (teamAbbr) => {
  try {
    const response = await axios.get(`${NHL_API_BASE_URL}/standings/now`);
    const teams = response.data.standings;
    return teams.find((team) => team.teamAbbrev.default === teamAbbr) || null;
  } catch (error) {
    console.error(`Error fetching stats for ${teamAbbr}:`, error.message);
    return null;
  }
};

const fetchLast10Games = async (teamAbbr) => {
  try {
    const response = await axios.get(`${NHL_API_BASE_URL}/standings/now`);
    const teamData = response.data.standings.find(
      (team) => team.teamAbbrev.default === teamAbbr
    );

    if (!teamData) {
      console.warn(`Team ${teamAbbr} not found in standings data.`);
      return { wins: 0 };
    }

    return { wins: teamData.l10Wins || 0 }; // Extract last 10 games' wins
  } catch (error) {
    console.error(
      `Error fetching last 10 games for ${teamAbbr}:`,
      error.message
    );
    return { wins: 0 }; // Default value to prevent crashes
  }
};

const fetchHeadToHead = async (teamAbbr1, teamAbbr2) => {
  try {
    const seasons = [20242025, 20232024]; // Fetching last two seasons
    let allGames = [];

    for (const season of seasons) {
      const response = await axios.get(
        `${NHL_API_BASE_URL}/club-schedule-season/${teamAbbr1.toLowerCase()}/${season}`
      );

      const games = response.data.games.filter(
        (game) =>
          (game.homeTeam.abbrev === teamAbbr1 && game.awayTeam.abbrev === teamAbbr2) ||
          (game.homeTeam.abbrev === teamAbbr2 && game.awayTeam.abbrev === teamAbbr1)
      );

      allGames = allGames.concat(games);
    }

    // If no head-to-head games were found, return defaults
    if (allGames.length === 0) {
      return {
        team1Wins: 0,
        team2Wins: 0,
        totalGames: 0,
        previousScores: [],
        team1AvgScore: 2.5, // Default to league average if no data
        team2AvgScore: 2.5,
      };
    }

    // Track the previous scores
    const previousScores = allGames.map((game) => ({
      homeTeam: game.homeTeam.abbrev,
      awayTeam: game.awayTeam.abbrev,
      homeScore: game.homeTeam.score,
      awayScore: game.awayTeam.score,
      gameDate: game.gameDate,
    }));

    // Calculate total wins for each team
    let team1Wins = 0;
    let team2Wins = 0;
    let team1TotalScore = 0;
    let team2TotalScore = 0;

    allGames.forEach((game) => {
      const team1IsHome = game.homeTeam.abbrev === teamAbbr1;
      const team1Score = team1IsHome ? game.homeTeam.score : game.awayTeam.score;
      const team2Score = team1IsHome ? game.awayTeam.score : game.homeTeam.score;

      team1TotalScore += team1Score;
      team2TotalScore += team2Score;

      if (team1Score > team2Score) {
        team1Wins++;
      } else if (team2Score > team1Score) {
        team2Wins++;
      }
    });

    // Calculate average scores per game
    const totalGames = allGames.length;
    const team1AvgScore = team1TotalScore / totalGames;
    const team2AvgScore = team2TotalScore / totalGames;

    return {
      team1Wins,
      team2Wins,
      totalGames,
      previousScores,
      team1AvgScore,
      team2AvgScore,
    };
  } catch (error) {
    console.error(`Error fetching head-to-head for ${teamAbbr1} vs ${teamAbbr2}:`, error.message);
    return { team1Wins: 0, team2Wins: 0, totalGames: 0, previousScores: [], team1AvgScore: 2.5, team2AvgScore: 2.5 };
  }
};

const predictOutcome = async (team1Abbr, team2Abbr) => {
  const team1Stats = await fetchTeamStats(team1Abbr);
  const team2Stats = await fetchTeamStats(team2Abbr);
  const last10Team1 = await fetchLast10Games(team1Abbr);
  const last10Team2 = await fetchLast10Games(team2Abbr);
  const headToHead = await fetchHeadToHead(team1Abbr, team2Abbr);

  if (!team1Stats || !team2Stats) {
    return { error: "Could not retrieve team data." };
  }

  const normalize = (value, max) => (value !== null && max !== 0 ? value / max : 0);

  const last10WinPct1 = normalize(last10Team1?.wins || 0, 10);
  const last10WinPct2 = normalize(last10Team2?.wins || 0, 10);

  const seasonWinPct1 = normalize(team1Stats.wins, team1Stats.wins + team1Stats.losses);
  const seasonWinPct2 = normalize(team2Stats.wins, team2Stats.wins + team2Stats.losses);

  const homeAwayAdvantage1 = normalize(team1Stats.homeWins, team1Stats.homeWins + team1Stats.homeLosses);
  const homeAwayAdvantage2 = normalize(team2Stats.roadWins, team2Stats.roadWins + team2Stats.roadLosses);

  const headToHeadPct1 = normalize(headToHead?.team1Wins || 0, headToHead?.totalGames || 5);
  const headToHeadPct2 = normalize(headToHead?.team2Wins || 0, headToHead?.totalGames || 5);

  const goalDiff1 = normalize(team1Stats.goalDifferential, 100);
  const goalDiff2 = normalize(team2Stats.goalDifferential, 100);

  // Calculate team performance score
  const team1Score =
    last10WinPct1 * 0.3 +
    seasonWinPct1 * 0.25 +
    homeAwayAdvantage1 * 0.10 +
    headToHeadPct1 * 0.25 +
    goalDiff1 * 0.10;

  const team2Score =
    last10WinPct2 * 0.3 +
    seasonWinPct2 * 0.25 +
    homeAwayAdvantage2 * 0.10 +
    headToHeadPct2 * 0.25 +
    goalDiff2 * 0.10;

  // Determine predicted winner
  const predictedWinner = team1Score > team2Score ? team1Stats.teamName.default : team2Stats.teamName.default;

  // Score Prediction Logic
  const previousScores = headToHead?.previousScores || [];
  let avgTeam1Goals = 2.5;
  let avgTeam2Goals = 2.5;

  if (previousScores.length > 0) {
    const validScores = previousScores.filter(game => game.homeTeamScore !== undefined && game.awayTeamScore !== undefined);

    if (validScores.length > 0) {
      avgTeam1Goals =
        validScores.reduce((sum, game) => sum + game.homeTeamScore, 0) / validScores.length;
      avgTeam2Goals =
        validScores.reduce((sum, game) => sum + game.awayTeamScore, 0) / validScores.length;
    }
  }

  // Adjust scores based on:
  // - Recent form (last 10 games)
  // - Goal differential
  // - Home/Away performance
  avgTeam1Goals += (last10WinPct1 - last10WinPct2) * 1.5 + goalDiff1 * 1.2 + homeAwayAdvantage1 * 1.0;
  avgTeam2Goals += (last10WinPct2 - last10WinPct1) * 1.5 + goalDiff2 * 1.2 + homeAwayAdvantage2 * 1.0;

  // Add slight randomness (within a range)
  const randomFactor = () => Math.random() * 1.5 - 0.75; // Random value between -0.75 and +0.75
  avgTeam1Goals += randomFactor();
  avgTeam2Goals += randomFactor();

  // Ensure realistic score predictions (>= 1 goal)
  avgTeam1Goals = Math.max(1, Math.round(avgTeam1Goals));
  avgTeam2Goals = Math.max(1, Math.round(avgTeam2Goals));

  // Prevent a tie
  if (avgTeam1Goals === avgTeam2Goals) {
    if (predictedWinner === team1Stats.teamName.default) {
      avgTeam1Goals += 1;
    } else {
      avgTeam2Goals += 1;
    }
  }

  const winningTeamGoals = avgTeam1Goals > avgTeam2Goals ? avgTeam1Goals : avgTeam2Goals;
  const losingTeamGoals = avgTeam1Goals < avgTeam2Goals ? avgTeam1Goals : avgTeam2Goals;

  return {
    predictedWinner,
    predictedScore: `${winningTeamGoals}-${losingTeamGoals}`,
    previousScores,
  };
};

// Route to predict game outcome
router.get("/predict-game", async (req, res) => {
  const { team1, team2 } = req.query;

  if (!team1 || !team2) {
    return res
      .status(400)
      .json({ error: "Missing team1 or team2 in request query" });
  }

  const prediction = await predictOutcome(team1, team2);
  res.json(prediction);
});

module.exports = router;
