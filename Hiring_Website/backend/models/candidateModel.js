const db = require("../config/db")

const Candidate = {
    getAll: async () => {
        const result = await db`select * from candidates`;
        return result;
    },

    getById: async (id) => {
        const result = await db`select * from candidates where id = ${id}`;
        return result[0];
    },

    updatePdfUrl: async (id, pdfUrl) => {
        const result = await db`
            UPDATE candidates 
            SET resume = ${pdfUrl}
            WHERE id = ${id}
            RETURNING *
        `;
        return result[0];
    },

    create: async (candidateData) => {
        const { name, email, phone, position } = candidateData;
        const result = await db`
            INSERT INTO candidates (name, email, phone, position, resume)
            VALUES (${name}, ${email}, ${phone}, ${position}, null)
            RETURNING *
        `;
        return result[0];
    }
}

module.exports = Candidate;