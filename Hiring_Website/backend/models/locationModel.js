const db = require("../config/db");

const Location = {
  getAll: async () => {
    const result = await db`SELECT DISTINCT location FROM jobs`;
    return result;
  },
};

module.exports = Location;
