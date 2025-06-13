const db = require("../config/db");

const TestQuestion = {
    getAllByTestId: async (testId) => {
        const result = await db`SELECT * from Test_Questions WHERE test_id = ${testId}`;
        return result;
    },

    getById: async (id) => {
        const result = await db`SELECT * from Test_Questions WHERE id = ${id}`;
        return result[0];
    },

    create: async (questionData) => {
        const { test_id, question_text, option_a, option_b, option_c, option_d, correct_option, mark } = questionData;
        const result = await db`
            INSERT INTO Test_Questions (test_id, question_text, option_a, option_b, option_c, option_d, correct_option, mark)
            VALUES (${test_id}, ${question_text}, ${option_a}, ${option_b}, ${option_c}, ${option_d}, ${correct_option}, ${mark})
            RETURNING *
        `;
        return result[0];
    },

    update: async (id, questionData) => {
        const { test_id, question_text, option_a, option_b, option_c, option_d, correct_option, mark } = questionData;
        const result = await db`
            UPDATE Test_Questions 
            SET test_id = ${test_id},
                question_text = ${question_text},
                option_a = ${option_a},
                option_b = ${option_b},
                option_c = ${option_c},
                option_d = ${option_d},
                correct_option = ${correct_option},
                mark = ${mark}
            WHERE id = ${id}
            RETURNING *
        `;
        return result[0];
    },

    delete: async (id) => {
        const result = await db`
            DELETE FROM Test_Questions 
            WHERE id = ${id}
            RETURNING *
        `;
        return result[0];
    }
};

module.exports = TestQuestion; 