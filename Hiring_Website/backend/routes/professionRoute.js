const express = require("express")
const router = express.Router();

const professionController = require('../controllers/professionController')

router.get('/professions', professionController.getProfessions);

module.exports = router;