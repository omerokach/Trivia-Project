"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("questions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.STRING,
      },
      question: {
        type: Sequelize.STRING,
      },
      question_values: {
        type: Sequelize.STRING,
      },
      answer: {
        type: Sequelize.STRING,
      },
      option_a: {
        type: Sequelize.STRING,
      },
      option_b: {
        type: Sequelize.STRING,
      },
      option_c: {
        type: Sequelize.STRING,
      },
      parameter_a: {
        type: Sequelize.STRING,
      },
      parameter_b: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.INTEGER,
      },
      num_of_votes: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("questions");
  },
};
