const db = require("../config/db")

const Application = {
    getAll: async () => {
        const result = await db`select applications.id, candidate_id, name, email, apply_phone, job_id, cover_letter, resume, email, apply_phone,applications.is_verify, name, applications.status, applied_at, jobs.title, jobs.employer_id from applications join jobs on applications.job_id = jobs.id`;
        return result;
    },


    create: async (applicationData) => {
        const { role_id, name, email, apply_phone, job_id, cover_letter, resume } = applicationData;
        const result = await db`
            INSERT INTO applications (candidate_id, name, email, apply_phone, job_id, cover_letter, resume, status, applied_at)
            VALUES (${role_id}, ${name}, ${email}, ${apply_phone}, ${job_id}, ${cover_letter}, ${resume}, 'chờ xử lý', NOW())
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
    },

    getByEmployerId: async (employerId) => {
        const result = await db`select applications.id, candidate_id, name, email, apply_phone, job_id, cover_letter, resume, email, apply_phone, name, applications.status, applied_at, jobs.title, jobs.employer_id  from applications join jobs on applications.job_id = jobs.id where jobs.employer_id = ${employerId} and applications.is_verify = true`;
        return result;
    },

    updateStatus: async (id, status) => {
        const result = await db`
            UPDATE applications 
            SET status = ${status}
            WHERE id = ${id}
            RETURNING *
        `;
        return result[0];
    },

    updateVerification: async (id, is_verify) => {
        const result = await db`
            UPDATE applications 
            SET is_verify = ${is_verify}
            WHERE id = ${id}
            RETURNING *
        `;
        return result[0];
    }
}

module.exports = Application;