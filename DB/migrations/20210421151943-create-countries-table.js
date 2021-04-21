"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("countries_table", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      country: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      region: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      coastline: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      net_migration: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      infant_mortality_per_thousand_births: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      gdp_per_capita: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      literacy: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      phones_per_thousand: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      arable: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      crops: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      other: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      climate: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      birthrate: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      deathrate: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      agriculture: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      industry: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      service: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      capital: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      continent: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      cost_of_living_index: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      rent_index: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      cost_of_living_plus_rent_index: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      groceries_index: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      restaurant_price_index: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      local_purchasing_power_index: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      age_zero_to_fourteen_years: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      age_fifteen_to_sixty_four_years: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      age_Above_sixty_five_years: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      crime_index: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      safety_index: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      health_care_index: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      health_Care_exp_index: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      price_to_income_ratio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      gross_rental_yield_city_centre: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      gross_rental_yield_outside_of_centre: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      price_to_rent_ratio_city_centre: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      price_to_rent_ratio_outside_of_city_centre: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      mortgage_as_a_percentage_of_income: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      affordability_index: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      quality_of_life_index: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      purchasing_power_index: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      property_price_to_income_ratio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      traffic_commute_time_index: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      pollution_index: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      climate_index: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("countries_table");
  },
};
