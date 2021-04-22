"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Question.init(
    {
      type: DataTypes.STRING,
      question: DataTypes.STRING(200),
      questionValues: DataTypes.STRING(8000),
      answer: DataTypes.STRING(100),
      optionA: DataTypes.STRING,
      optionB: DataTypes.STRING,
      optionC: DataTypes.STRING,
      parameterA: DataTypes.STRING,
      parameterB: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      numOfVotes: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Question",
      tableName: "questions",
      underscored: true,
    }
  );
  return Question;
};
