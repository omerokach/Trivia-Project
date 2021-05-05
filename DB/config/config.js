require("dotenv").config();
module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: "34.122.130.179",
    port: "3306",
    dialect: "mysql",
    logging: false,
  },
  test: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: "34.122.130.179",
    port: "3306",
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
    },
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
    },
  },
};
