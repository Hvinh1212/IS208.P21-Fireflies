const db = require("../config/db");

const User = {
    getAll: async () => {
        const result = await db`SELECT * FROM users`;
        return result;
    },

    add: async (userData, callback) => {
        try {
            const emailResult = await db`
                SELECT 1 FROM users WHERE user_email = ${userData.user_email}
            `;

            if (emailResult.length > 0) {
                return callback(null, {
                    message: "Email đã đăng ký. Vui lòng chọn email khác",
                    success: false,
                });
            }

            // Chèn user và lấy id được tạo ra
            const insertUserResult = await db`
                INSERT INTO users (
                    user_login_name, full_name, user_password,  
                    user_email, permis
                ) VALUES (
                    ${userData.user_login_name},
                    ${userData.user_login_name},
                    ${userData.user_password},
                    ${userData.user_email},
                    'candidate'
                ) RETURNING id
            `;

            const user_id = insertUserResult[0].id;

            await db`
                INSERT INTO candidates (
                    user_id
                ) VALUES (
                    ${user_id}
                )
            `;

            return callback(null, {
                message: "Thêm người dùng thành công",
                success: true,
            });

        } catch (err) {
            return callback(err, null);
        }
    }

};

module.exports = User;
