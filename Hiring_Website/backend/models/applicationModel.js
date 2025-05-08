const db = require("../config/db")

const Application = {
    getAll: async () => {
        const result = await db`select * from applications`;
        return result;
    },


    create: async (applicationData) => {
        const { name, email, apply_phone, job_id, cover_letter, resume } = applicationData;
        const result = await db`
            INSERT INTO applications (name, email, apply_phone, job_id, cover_letter, resume, status, created_at)
            VALUES (${name}, ${email}, ${apply_phone}, ${job_id}, ${cover_letter}, ${resume}, 'chờ xử lý', NOW())
            RETURNING *
        `;
        return result[0];
    },

    getById: async (id) => {
        const result = await db`select * from applications where id = ${id}`;
        return result[0];
    },

    getByJobId: async (jobId) => {
        const result = await db`select * from applications where job_id = ${jobId}`;
        return result;
    }
}

module.exports = Application;