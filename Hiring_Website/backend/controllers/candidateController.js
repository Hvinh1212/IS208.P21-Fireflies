const Candidate = require('../models/candidateModel');

exports.getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.getAll();
        res.status(200).json(candidates);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}