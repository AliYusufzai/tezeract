const sequelize = require("../../config/database");
const { Sequelize, QueryTypes } = require("sequelize");
const Employees = require("../../model/employees");

module.exports = {
    calculateAverageSalary: async (req, res) => {
        try {
            const departSalaries = await sequelize.query(
                `SELECT position, AVG(salary) AS averageSalary FROM Employees GROUP BY position`,
                {
                    type: QueryTypes.SELECT,
                }
            );
            const results = Object.entries(departSalaries).map(
                ([index, { position, averageSalary }]) => ({
                    position,
                    averageSalary: parseFloat(averageSalary).toFixed(2),
                })
            );
            res.status(200).json({ success: 1, data: results });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: 0, message: error.message });
        }
    },

    retrieveExperiencedEmployees: async (req, res) => {
        try {
            const minExperienceLevel = 3;
            const maxExperienceLevel = 5;
            const maxDate = new Date();
            maxDate.setFullYear(maxDate.getFullYear() - minExperienceLevel);
            const minDate = new Date();
            minDate.setFullYear(minDate.getFullYear() - maxExperienceLevel);
            const experienceEmployees = await sequelize.query(
                `SELECT name, position, salary, joiningDate FROM Employees WHERE joiningDate BETWEEN :minDate AND :maxDate`,
                {
                    replacements: {
                        minDate,
                        maxDate,
                    },
                    type: QueryTypes.SELECT,
                }
            );

            res.status(200).json({ success: 1, data: experienceEmployees });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: 0, message: error.message });
        }
    },

    topEarners: async (req, res) => {
        try {
            const value = req.params.n;
            const topEarners = await Employees.findAll({
                order: [["salary", "DESC"]],
                limit: parseInt(value),
            });

            res.status(200).json({ success: 1, data: topEarners });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: 0, message: error.message });
        }
    },

    filterBySalary: async (req, res) => {
        try {
            const minSalary = req.query.min;
            const maxSalary = req.query.max;

            const employeesBySalary = await Employees.findAll({
                where: {
                    salary: {
                        [Sequelize.Op.between]: [
                            parseInt(minSalary),
                            parseInt(maxSalary),
                        ],
                    },
                },
            });

            res.json({ success: 1, data: employeesBySalary });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: 0,
                message: "Internal Server Error",
            });
        }
    },
};
