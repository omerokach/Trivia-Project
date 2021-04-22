"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HighScores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HighScores.init(
    {
      userName: DataTypes.STRING,
      score: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "HighScores",
      tableName: "high_scores",
      underscored: true,
    }
  );
  return HighScores;
};
