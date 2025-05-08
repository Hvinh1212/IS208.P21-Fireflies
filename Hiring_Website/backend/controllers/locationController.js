const Location = require("../models/locationModel");

exports.getLocation = async (req, res) => {
  try {
    const locations = await Location.getAll();
    res.status(200).json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
