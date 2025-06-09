const ForgotPass = require('../models/forgotPassModel');

exports.getCode = (req, res) => {
    const { user_email } = req.body;
    ForgotPass.Code(user_email, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result);
    })
};