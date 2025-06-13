const express = require("express");
const router = express.Router();

const jobTestController = require("../controllers/jobTestController");

router.get("/jobtest", jobTestController.getAllTests);

router.get("/jobtest/:id", jobTestController.getTestById);

router.post("/jobtest", jobTestController.createTest);

router.put("/:id", jobTestController.updateTest);

router.delete("/jobtest/:id", jobTestController.deleteTest);

module.exports = router;
