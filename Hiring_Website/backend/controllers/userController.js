const User = require('../models/userModel');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.getAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addUser = (req, res) => {
    const userData = req.body;
    User.add(userData, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(user);
    });
};
