const db = require("../config/db");

const JobType = {
  getAll: async () => {
    const result = await db`SELECT DISTINCT job_type FROM jobs`;
    return result;
  },
};

module.exports = JobType;
