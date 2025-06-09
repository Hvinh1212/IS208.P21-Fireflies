
const express = require('express');
const router = express.Router();

const controllerFogotPass = require('../controllers/forgotPassController');


router.post('/forgotpass', controllerFogotPass.getCode);



module.exports = router;
