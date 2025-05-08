const db = require('../config/db');

const Login = {
    loginpost: async (user_login_name, user_password) => {
        try {
            const sql = 'SELECT * FROM users WHERE user_login_name = $1 AND user_password = $2';
            const result = await db.query(sql, [user_login_name, user_password]);

            if (result.length > 0) {
                return {
                    success: true,
                    message: "Đăng nhập thành công",
                    user_id: result[0].id,
                    permission: result[0].permis
                };
            } else {
                return {
                    success: false,
                    message: "Người dùng chưa đăng ký",

                };

            }
        } catch (err) {
            throw err;
        }
    }
};

module.exports = Login;


