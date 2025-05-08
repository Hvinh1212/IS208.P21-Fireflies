const db = require("../config/db")

const Professtion = {
    getAll: async () => {
        const result = await db`select * from job_categories`;
        return result;
    }
}

module.exports = Professtion