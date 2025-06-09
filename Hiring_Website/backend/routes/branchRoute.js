const express = require('express');
const router = express.Router()

const branchController = require("../controllers/branchController");

router.get('/branches', branchController.getBranches);

module.exports = router;