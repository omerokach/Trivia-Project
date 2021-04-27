const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const triviaRoute = require("./routes/trivia");
const highScoreRoute = require("./routes/high_score");
const ratingRoute = require("./routes/rating");
const usersRoute = require("./routes/users");
const { checkUser } = require("./middlewares/authMiddleware");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/trivia", checkUser, triviaRoute);
app.use("/high_score", checkUser, highScoreRoute);
app.use("/rating", checkUser, ratingRoute);
app.use("/users", usersRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT}`)
);
