// // routes/productRoutes.js

const express = require('express');
const router = express.Router();

const controllerLogin = require('../controllers/loginController');


// Định nghĩa các API route
router.post('/login', controllerLogin.login);



module.exports = router;
