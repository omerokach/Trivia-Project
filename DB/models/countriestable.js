"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CountriesTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CountriesTable.init(
    {
      km: DataTypes.INTEGER,
      population: DataTypes.INTEGER,
      density_pop_km: DataTypes.INTEGER,
      country: DataTypes.TEXT,
      region: DataTypes.TEXT,
      coastline: DataTypes.DOUBLE,
      netMigration: DataTypes.DOUBLE,
      infantMortalityPerThousandBirths: DataTypes.DOUBLE,
      gdpPerCapita: DataTypes.INTEGER,
      literacy: DataTypes.DOUBLE,
      phonesPerThousand: DataTypes.DOUBLE,
      arable: DataTypes.DOUBLE,
      crops: DataTypes.DOUBLE,
      other: DataTypes.DOUBLE,
      climate: DataTypes.INTEGER,
      birthrate: DataTypes.DOUBLE,
      deathrate: DataTypes.DOUBLE,
      agriculture: DataTypes.TEXT,
      industry: DataTypes.TEXT,
      service: DataTypes.TEXT,
      capital: DataTypes.TEXT,
      continent: DataTypes.TEXT,
      costOfLivingIndex: DataTypes.TEXT,
      rentIndex: DataTypes.TEXT,
      costOfLivingPlusRentIndex: DataTypes.TEXT,
      groceriesIndex: DataTypes.TEXT,
      restaurantPriceIndex: DataTypes.TEXT,
      localPurchasingPowerIndex: DataTypes.TEXT,
      ageZeroToFourteenYearsPercentage: DataTypes.TEXT,
      ageFifteenToSixtyFourYearsPercentage: DataTypes.TEXT,
      ageAboveSixtyFiveYearsPercentage: DataTypes.TEXT,
      crimeIndex: DataTypes.TEXT,
      safetyIndex: DataTypes.TEXT,
      healthCareIndex: DataTypes.TEXT,
      healthCareExpIndex: DataTypes.TEXT,
      priceToIncomeRatio: DataTypes.TEXT,
      grossRentalYieldCityCentre: DataTypes.TEXT,
      grossRentalYieldOutsideOfCentre: DataTypes.TEXT,
      priceToRentRatioCityCentre: DataTypes.TEXT,
      priceToRentRatioOutsideOfCityCentre: DataTypes.TEXT,
      mortgageAsAPercentageOfIncome: DataTypes.TEXT,
      affordabilityIndex: DataTypes.TEXT,
      qualityOfLifeIndex: DataTypes.TEXT,
      purchasingPowerIndex: DataTypes.TEXT,
      propertyPriceToIncomeRatio: DataTypes.TEXT,
      trafficCommuteTimeIndex: DataTypes.TEXT,
      pollutionIndex: DataTypes.TEXT,
      climateIndex: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "CountriesTable",
      tableName: "countries_table",
      underscored: true,
    }
  );
  return CountriesTable;
};
