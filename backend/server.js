const express = require("express");
const cors = require("cors");
const path = require("path");
const nhlRoutes = require("./nhlRoutes"); // Import the new file

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use("/api", nhlRoutes); // Use the NHL routes under the "/api" prefix

// Serve React static files
app.use(express.static(path.join(__dirname, "frontend", "build")));

// Catch-all route (must be last)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
