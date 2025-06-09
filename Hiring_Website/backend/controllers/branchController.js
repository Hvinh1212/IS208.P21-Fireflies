const Branch = require('../models/branchModel');

exports.getBranches = async (req, res) => {
    try {
        const branches = await Branch.getAll();
        res.status(200).json(branches);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}