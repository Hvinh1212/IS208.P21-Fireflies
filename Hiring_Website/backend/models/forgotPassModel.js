const sql = require('../config/db');
const nodemailer = require("nodemailer");

const FogotPass = {
    Code: async (user_email, callback) => {
        try {
            const result = await sql`SELECT * FROM users WHERE user_email = ${user_email}`;
            if (result.length === 0) {
                return callback(null, {
                    success: false,
                    message: "Email không chính xác",
                });
            }

            const user = result[0];
            const code = Math.floor(1001 + Math.random() * 8999);

            const forgotResult = await sql`SELECT * FROM forgetpassword WHERE email = ${user_email}`;
            if (forgotResult.length > 0) {
                await sql`UPDATE forgetpassword SET code = ${code} WHERE email = ${user_email}`;
            } else {
                await sql`INSERT INTO forgetpassword (email, code) VALUES (${user_email}, ${code})`;
            }

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "ntmkhai456@gmail.com",
                    pass: "momx ijtf botr pqba",
                },
            });

            const mailOptions = {
                from: "Joby@gmail.com",
                to: user_email,
                subject: "Mã xác nhận",
                html: `<html>Chào ${user.full_name},<br>
                Để hoàn tất quy trình, vui lòng nhập mã xác nhận dưới đây:<br>
                <h1>Mã xác nhận của bạn là: ${code}</h1>
                Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này hoặc liên hệ với chúng tôi để được hỗ trợ.<br>
                Trân trọng,<br>Joby Hiring</html>`
            };

            await transporter.sendMail(mailOptions);

            return callback(null, {
                success: true,
                message: 'Mã xác nhận đã được gửi'
            });

        } catch (err) {
            return callback(err, null);
        }
    },
};

module.exports = FogotPass;
