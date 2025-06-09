const db = require("../config/db");

const Category = {
    getAll: async () => {
        const result = await db`SELECT id as category_id, category_name as name FROM job_categories`;
        return result;
    },
};

module.exports = Category;
