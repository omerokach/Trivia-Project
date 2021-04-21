const { CountriesTable } = require("./models");

CountriesTable.findOne({}).then((data) => console.log(data.toJSON()));
