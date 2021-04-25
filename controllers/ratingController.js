const { ScoreRankCalculator, Question } = require("../DB/models");
const { sequelize } = require("../DB/models/index");

const calculateQuestionRating = async (questionId) => {
  let questionArr = await ScoreRankCalculator.findAll({
    where: { questionId: questionId },
  });
  const calculatedRatingArr = questionArr.map(
    (data) => data.dataValues.rating * data.dataValues.userScore
  );
  let sumCalculatedRating = 0;
  calculatedRatingArr.forEach((data) => (sumCalculatedRating += data));
  let sumPlayerVotedScore = 0;
  questionArr.forEach(
    (data) => (sumPlayerVotedScore += data.dataValues.userScore)
  );
  finalCalculatedRating = Math.floor(sumCalculatedRating / sumPlayerVotedScore);
  finalCalculatedRating === 0 ? (finalCalculatedRating = 1) : null;
  const update = await Question.update(
    {
      rating: finalCalculatedRating,
      numOfVotes: sequelize.literal("num_of_votes + 1"),
    },
    { where: { id: questionId } }
  );
};

module.exports.ratings_post = async (req, res) => {
  const data = req.body;
  let resDataArr = [];
  try {
    for (const obj of data.ratingArr) {
      const resData = await ScoreRankCalculator.create({
        userId: data.userId,
        questionId: obj.questionId,
        rating: obj.rating,
        userScore: data.userScore,
      });
      resDataArr.push(resData.dataValues);
    }
    data.ratingArr.map(async (obj, i) => {
      await calculateQuestionRating(obj.questionId);
    });
    return res.status(201).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
