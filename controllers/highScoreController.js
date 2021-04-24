const { HighScores } = require("../DB/models");

module.exports.highScores_get = async (req, res) => {
  try {
    const response = await HighScores.findAll({});
    const highScoreTable = response.map((user) => {
      return {
        name: user.userName,
        score: user.score,
      };
    });
    res.json(highScoreTable);
  } catch (error) {
    console.log(error);
  }
};

module.exports.highScores_post = async (req, res) => {
  const userScore = req.body;
  try {
    await HighScores.create(userScore);
    const dbRes = await HighScores.findAll({});
    const arr = dbRes.map((obj) => obj.toJSON());
    arr.sort((a, b) => b.score - a.score);
    let userIndex = 0;
    arr.forEach((obj, i) => {
      console.log(obj, i);
      if (userScore.score === obj.score) {
        userIndex = i + 1;
      }
    });
    res.json({ userIndex });
  } catch (error) {
    console.log(error);
  }
};
