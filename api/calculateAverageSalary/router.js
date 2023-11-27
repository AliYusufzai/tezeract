const router = require("express").Router();
const {
    calculateAverageSalary,
    retrieveExperiencedEmployees,
    topEarners,
    filterBySalary,
} = require("./controller");

router.get("/", calculateAverageSalary);
router.get("/experience", retrieveExperiencedEmployees);
router.get("/earners/:n", topEarners);
router.get("/filter/", filterBySalary);

module.exports = router;
