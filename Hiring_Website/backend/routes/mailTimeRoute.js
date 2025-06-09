const express = require('express');
const router = express.Router();
const controllerMailTime = require('../controllers/mailTimeController');

router.post('/mailtime', controllerMailTime.sendMail);

module.exports = router;
