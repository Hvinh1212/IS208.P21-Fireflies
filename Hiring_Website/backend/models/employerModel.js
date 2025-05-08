const db = require("../config/db");
const { getByEmployerId } = require("./postModel");

const Employer = {
  getAll: async () => {
    const result = await db`select * from employers`;
    return result;
  },

  getById: async (id) => {
    const result = await db`select * from employers where id = ${id}`;
    return result.length ? result[0] : null;
  },

  getByEmployerId: async (employerId) => {
    const result = await db`select * from employers where id = ${employerId}`;
    return result.length ? result[0] : null;
  },
};

module.exports = Employer;
