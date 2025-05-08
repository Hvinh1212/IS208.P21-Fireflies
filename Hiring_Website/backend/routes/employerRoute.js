const express = require("express");
const router = express.Router();

const employerController = require("../controllers/employerController");

router.get("/employers", employerController.getEmployers);
router.get("/employers/:id", employerController.getEmployerById);

module.exports = router;
