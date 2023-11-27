const { Sequelize } = require("sequelize");

const DB_HOST = "localhost";
const DB_USER = "ali";
const DB_PASS = "Information03@";
const DB_NAME = "tezeract";
const DB_PORT = 3306;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: "mysql",
    logging: () => {},
});

module.exports = sequelize;
