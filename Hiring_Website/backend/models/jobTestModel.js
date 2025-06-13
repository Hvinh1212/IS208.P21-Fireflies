const db = require("../config/db");

const Test = {
    getAll: async () => {
        const result = await db`SELECT t.id, job_id, j.title, test_name, test_description, duration from job_tests t join jobs j on t.job_id = j.id`;
        return result;
    },

    getById: async (id) => {
        const result = await db`SELECT * from job_tests WHERE id = ${id}`;
        return result[0];
    },

    create: async (testData) => {
        const { job_id, test_name, test_description, duration } = testData;
        const result = await db`
            INSERT INTO job_tests (job_id, test_name, test_description, duration)
            VALUES (${job_id}, ${test_name}, ${test_description}, ${duration})
            RETURNING *
        `;
        return result[0];
    },

    update: async (id, testData) => {
        const { job_id, test_name, test_description, duration } = testData;
        const result = await db`
            UPDATE job_tests 
            SET job_id = ${job_id},
                test_name = ${test_name},
                test_description = ${test_description},
                duration = ${duration}
            WHERE id = ${id}
            RETURNING *
        `;
        return result[0];
    },

    delete: async (id) => {
        const result = await db`
            DELETE FROM job_tests 
            WHERE id = ${id}
            RETURNING *
        `;
        return result[0];
    }
};

module.exports = Test;
