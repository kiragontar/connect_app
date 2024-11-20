const express = require("express");
const robot = require("robotjs");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Route to handle play/pause
app.post("/play-pause", (req, res) => {
  robot.keyTap("audio_play");
  res.send({ status: "Play/Pause triggered" });
});

// Route to handle next track
app.post("/next", (req, res) => {
  robot.keyTap("audio_next");
  res.send({ status: "Next track triggered" });
});

// Route to handle previous track
app.post("/previous", (req, res) => {
  robot.keyTap("audio_prev");
  res.send({ status: "Previous track triggered" });
});

app.listen(port, () => {
  console.log(`Media control server running at http://localhost:${port}`);
});
