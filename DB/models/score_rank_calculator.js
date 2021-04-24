"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ScoreRankCalculator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Question, { foreignKey: questionId });
    }
  }
  ScoreRankCalculator.init(
    {
      userId: DataTypes.INTEGER,
      questionId: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      userScore: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ScoreRankCalculator",
      tableName: "score_rank_calculator",
      underscored: true,
    }
  );
  return ScoreRankCalculator;
};
