const sql = require('../config/db');

const ConfirmPass = {
    confirmpost: async (user_email, code, newPassword, callback) => {
        try {
            const result = await sql`SELECT * FROM forgetpassword WHERE email = ${user_email}`;
            if (result.length === 0) {
                return callback(null, {
                    success: false,
                    message: "Email không chính xác",
                });
            }

            const forgetEntry = result[0];

            if (forgetEntry.code !== code) {
                return callback(null, {
                    success: false,
                    message: 'Code xác thực không chính xác',
                });
            }

            await sql`UPDATE users SET user_password = ${newPassword} WHERE user_email = ${user_email}`;
            await sql`DELETE FROM forgetpassword WHERE code = ${code}`;

            return callback(null, {
                success: true,
                message: "Thay đổi mật khẩu thành công",
            });

        } catch (err) {
            return callback(err, null);
        }
    }
};

module.exports = ConfirmPass;
