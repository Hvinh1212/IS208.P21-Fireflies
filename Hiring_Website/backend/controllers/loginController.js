
const Login = require('../models/loginModel');

exports.login = async (req, res) => {
    try {
        const { user_login_name, user_password } = req.body;
        const result = await Login.loginpost(user_login_name, user_password);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


