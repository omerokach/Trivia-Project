const { ScoreRankCalculator, Question } = require("../DB/models");
const { sequelize } = require("../DB/models/index");

const calculateQuestionRating = async (questionId) => {
  const questionArr = await ScoreRankCalculator.findAll({
    where: { questionId: questionId },
  });
  console.log(questionArr);
  //   const calculatedRatingArr = questionArr.map(
  //     (data) => data.dataValues.rating * data.dataValues.userScore
  //   );
  //   let sumCalculatedRating = 0;
  //   calculatedRatingArr.forEach((data) => (sumCalculatedRating += data));
  //   let sumPlayerVotedScore = 0;
  //   questionArr.forEach(
  //     (data) => (sumPlayerVotedScore += data.dataValues.userScore)
  //   );
  //   finalCalculatedRating = Math.floor(sumCalculatedRating / sumPlayerVotedScore);
  //   finalCalculatedRating === 0 ? (finalCalculatedRating = 1) : null;
  //   const update = await Question.update(
  //     {
  //       rating: finalCalculatedRating,
  //       numOfVotes: sequelize.literal("num_of_votes + 1"),
  //     },
  //     { where: { id: questionId } }
  //   );
};

module.exports.ratings_get = async (req, res) => {};

module.exports.ratings_post = async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    data.ratingArr.map(async (obj) => {
      await ScoreRankCalculator.create({
        userId: data.userId,
        questionId: obj.questionId,
        rating: obj.rating,
        userScore: data.userScore,
      });
    });
  } catch (error) {
    console.log(error);
  }
  data.ratingArr.map((obj) => {
    calculateQuestionRating(obj.questionId);
  });
};
