const JobType = require("../models/jobTypeModel");

exports.getJobType = async (req, res) => {
  try {
    const jobtypes = await JobType.getAll();
    res.status(200).json(jobtypes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
