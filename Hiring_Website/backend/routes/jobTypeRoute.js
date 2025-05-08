const express = require("express");
const router = express.Router();

const jobTypeController = require("../controllers/jobTypeController");

router.get("/jobtypes", jobTypeController.getJobType);

module.exports = router;
