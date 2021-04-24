const { Question, ScoreRankCalculator } = require("../DB/models");
const { questionGenerator } = require("../DB/query");
const { Sequelize, Op } = require("sequelize");

const questionObjFunction = (question) => {
  let options = [];
  if (question.optionA === null) {
    options = ["Yes", "No"];
  } else {
    options = [
      question.answer,
      question.optionA,
      question.optionB,
      question.optionC,
    ];
  }

  options.sort(() => Math.random() - 0.5);
  const questionObj = {
    id: question.id,
    type: question.type,
    question: question.question,
    questionValues: JSON.parse(question.questionValues),
    answer: question.answer,
    options,
    optionA: question.optionA,
    optionB: question.optionB,
    optionC: question.optionC,
    questionAbout: question.questionAbout,
    parameterA: question.parameterA,
    parameterB: question.parameterB,
    rating: question.rating,
    numOfVotes: question.numOfVotes,
  };

  return questionObj;
};

const calculateQuestionRating = async (questionId) => {
  const questionArr = await ScoreRankCalculator.findAll({
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
  const update = await Question.findOne({ where: { id: questionId } });
  update.rating = finalCalculatedRating;
  await update.save({ fields: ["rating"] });
};

module.exports.generateQuestion_get = async (req, res) => {
  try {
    const question = await questionGenerator();
    res.status(200).json(questionObjFunction(question));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.saveNewQuestion_post = async (req, res) => {
  try {
    const newQuestion = req.body;
    newQuestion.questionValues = JSON.stringify(newQuestion.questionValues);
    const ifExist = await Question.findOne({
      where: {
        [Op.and]: [
          { question: newQuestion.question },
          { questionValues: JSON.stringify(newQuestion.questionValues) },
        ],
      },
    });
    if (!ifExist) {
      const dbRes = await Question.create(newQuestion);
      calculateQuestionRating(dbRes.dataValues.id);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.savedQuestion_get = async (req, res) => {
  try {
    let savedQuestions = await Question.findAll({});
    savedQuestions = savedQuestions.map((question) => {
      return {
        id: question.id,
        rating: question.rating,
      };
    });
    let sumRank = 0;
    savedQuestions.forEach((question) => {
      sumRank += question.rating;
    });
    questionIdAndPercentage = savedQuestions.map((question) => {
      return {
        id: question.id,
        percentage: Math.floor((question.rating / sumRank) * 100),
      };
    });
    const idArr = [];
    questionIdAndPercentage.forEach((question) => {
      for (let i = 0; i < question.percentage; i++) {
        idArr.push(question.id);
      }
    });
    const randomIndex = Math.floor(Math.random() * idArr.length);
    const question = await Question.findOne({
      where: { id: idArr[randomIndex] },
    });
    const questionObj = questionObjFunction(question.dataValues);
    res.status(200).json(questionObj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
