const express = require("express");
const router = express.Router();

const locationController = require("../controllers/locationController");

router.get("/locations", locationController.getLocation);

module.exports = router;
