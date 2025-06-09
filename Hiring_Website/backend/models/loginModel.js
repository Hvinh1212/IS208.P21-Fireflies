const db = require('../config/db');

const Login = {
    loginpost: async (user_login_name, user_password) => {
        try {
            const sql = `SELECT 
  users.id AS user_id,
  users.user_login_name,
  users.user_password,
  candidates.id as role_id,
  users.permis
FROM users 
JOIN candidates ON users.id = candidates.user_id 
WHERE user_login_name = $1 AND user_password = $2

UNION

SELECT 
  users.id AS user_id,
  users.user_login_name,
  users.user_password,
  employers.id as role_id,
  users.permis
FROM users 
JOIN employers ON users.id = employers.user_id 
WHERE user_login_name = $1 AND user_password = $2`;
            const result = await db.query(sql, [user_login_name, user_password]);

            if (result.length > 0) {
                return {
                    success: true,
                    message: "Đăng nhập thành công",
                    user_id: result[0].user_id,
                    permission: result[0].permis,
                    role_id: result[0].role_id
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


