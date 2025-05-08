const Employer = require("../models/employerModel");

exports.getEmployers = async (req, res) => {
  try {
    const employers = await Employer.getAll();
    res.status(200).json(employers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEmployerById = async (req, res) => {
  const { id } = req.params;
  try {
    const employer = await Employer.getById(id);
    if (employer) {
      res.status(200).json(employer);
    } else {
      res.status(404).json({ message: "Employer not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
