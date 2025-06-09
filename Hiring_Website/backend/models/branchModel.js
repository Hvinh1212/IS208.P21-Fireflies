const db = require("../config/db");

const Branch = {
    getAll: async () => {
        const result = await db`SELECT id as branch_id, location as name FROM branches`;
        return result;
    },
};

module.exports = Branch;
