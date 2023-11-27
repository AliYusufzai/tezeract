const express = require("express");

const app = express();
const router_averageSalary = require("./api/calculateAverageSalary/router");
const PORT = 5000;
const sequelize = require("./config/database");
const employeeDetails = require("./model/employees");

sequelize
    .authenticate()
    .then(() => {
        console.log(
            "Connection to the database has been established successfully."
        );
        sequelize
            .sync()
            .then(() => {
                console.log("Database and tables have been created!");
            })
            .catch((syncError) => {
                console.error("Error synchronizing models:", syncError);
            });
    })
    .catch((authError) => {
        console.error("Unable to connect to the database: ", authError);
    });

app.use("/calculate", router_averageSalary);
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
