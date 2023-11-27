const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const Employee = sequelize.define("Employees", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: { type: Sequelize.STRING, allowNull: false },
    position: { type: Sequelize.STRING, allowNull: false },
    salary: { type: Sequelize.INTEGER, allowNull: false },
    joiningDate: { type: Sequelize.DATE },
});

module.exports = Employee;
