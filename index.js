const express = require("express");
const cors = require("cors");
const app = express();
const triviaRoute = require("./routes/trivia");
const highScoreRoute = require("./routes/high_score");
const ratingRoute = require("./routes/rating");

app.use(cors());
app.use(express.json());

app.use("/trivia", triviaRoute);
app.use("/high_score", highScoreRoute);
app.use("/rating", ratingRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT}`)
);
