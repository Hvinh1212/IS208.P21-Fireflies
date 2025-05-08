const express = require("express")
const router = express.Router();

const userController = require("../controllers/userController")

router.get('/users', userController.getUsers)
router.post('/users/register', userController.addUser);

module.exports = router;