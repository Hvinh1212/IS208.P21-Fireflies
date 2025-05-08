const express = require('express');
const router = express.Router()

const candidateController = require("../controllers/candidateController");

router.get('/candidates', candidateController.getCandidates);

module.exports = router;