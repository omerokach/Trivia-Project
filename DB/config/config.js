require("dotenv").config();
module.exports = {
  development: {
    username: "root",
    password: "o1m2e3r4",
    database: "trivia",
    host: "34.122.130.179",
    port: "3306",
    dialect: "mysql",
    logging: false,
    socketpath: "/cloudsql/firm-pentameter-312707:us-central1:countries-trivia",
  },
  test: {
    username: "root",
    password: "o1m2e3r4",
    database: "trivia",
    host: "34.122.130.179",
    dialect: "mysql",
    logging: false,
    socketpath: "/cloudsql/firm-pentameter-312707:us-central1:countries-trivia",
  },
  production: {
    username: "root",
    password: "o1m2e3r4",
    database: "trivia",
    host: "34.122.130.179",
    port: "3306",
    dialect: "mysql",
    logging: false,
    socketpath: "/cloudsql/firm-pentameter-312707:us-central1:countries-trivia",
  },
};
