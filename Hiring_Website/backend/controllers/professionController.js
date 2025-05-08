const Profession = require("../models/professionModel")

exports.getProfessions = async (req, res) => {
    try {
        const professtions = await Profession.getAll();
        res.status(200).json(professtions)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}