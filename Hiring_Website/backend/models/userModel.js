const db = require("../config/db");

const User = {
    getAll: async () => {
        const result = await db`SELECT * FROM users`;
        return result;
    },

    add: (userData, callback) => {
        const addUser = `insert into users (
        user_login_name, user_password,  
        user_email) 
        values ($1, $2, $3) 
        returning user_id`;

        const values = [
            userData.user_login_name,
            userData.user_password,
            userData.user_email,
        ];

        const checkEmailExists = `select s from users s 
        where s.user_email = $1`;

        const addUserIsCustomer = `insert into customers (user_id) 
        values ($1)`

        db.query(checkEmailExists, [userData.user_email], (err, result) => {
            if (result.rows.length) {
                // email đã đăng ký, 
                return callback(null, {
                    message: "Email đã đăng ký. Vui lòng chọn email khác",
                    success: false,
                });
            } else {
                db.query(addUser, values, (err, result) => {
                    if (err) {
                        return callback(err, null);
                    }
                    const userId = result.rows[0].user_id;
                    db.query(addUserIsCustomer, [userId], (err, result) => {
                        if (err) {
                            return callback(err, null);
                        }
                        return callback(null, {
                            message: "Thêm người dùng thành công",
                            success: true,
                        });
                    })
                })
            }
        })
    },
};

module.exports = User;
