
const express = require('express');
const router = express.Router();

const controllerConfirmPass = require('../controllers/confirmPassController');


router.post('/confirm', controllerConfirmPass.confirm);



module.exports = router;
