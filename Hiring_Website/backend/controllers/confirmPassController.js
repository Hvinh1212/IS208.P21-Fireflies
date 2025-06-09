const ConfirmPass = require('../models/confirmPassModel');

exports.confirm = (req, res) => {
    const { email, code, newPassword } = req.body;
    ConfirmPass.confirmpost(email, code, newPassword, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result);
    })
};

