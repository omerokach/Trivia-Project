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
    return res.status(200).json(highScoreTable);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.highScores_post = async (req, res) => {
  const userScore = req.body;
  let existUser;
  try {
    existUser = await HighScores.findOne({
      where: { userName: userScore.userName },
    });
    if (!existUser) {
      existUser = await HighScores.create(userScore);
    } else {
      if (existUser.dataValues.score < userScore.score) {
        await HighScores.update(
          { score: userScore.score },
          { where: { userName: userScore.userName } }
        );
      }
    }
    const dbRes = await HighScores.findAll({});
    const arr = dbRes.map((obj) => obj.toJSON());
    arr.sort((a, b) => b.score - a.score);
    let userIndex = 0;
    arr.forEach((obj, i) => {
      if (userScore.score === obj.score) {
        userIndex = i + 1;
      }
    });
    return res.status(200).json({ userIndex, userId: existUser.dataValues.id });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
