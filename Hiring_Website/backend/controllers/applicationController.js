const Application = require('../models/applicationModel');

exports.getApplications = async (req, res) => {
    try {
        const applications = await Application.getAll();
        res.status(200).json(applications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}