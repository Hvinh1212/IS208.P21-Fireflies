const db = require('../config/db');
const nodemailer = require("nodemailer");

const MailTime = {
    SendMail: async (req) => {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "ntmkhai456@gmail.com",
                pass: "momx ijtf botr pqba",
            },
        });

        const mailOptions = {
            from: "joby@gmail.com",
            to: "22521673@gm.uit.edu.vn",
            subject: "Thông báo phỏng vấn",
            html: `<html>Chào ứng viên,<br>
                Cảm ơn bạn đã ứng tuyển vào công ty của chúng tôi.<br>
                Chúng tôi đã nhận được hồ sơ của bạn và đang xem xét để tiếp tục quy trình tuyển dụng.<br>
                Buổi phỏng vấn online sẽ được tổ chức vào ngày 30/6/2025 lúc 10:00.<br>
                Link phỏng vấn: https://meet.google.com/abc-xyz-123<br>
                Mã phòng: 123456<br>
                Mật khẩu: 123456<br>
                Vui lòng đăng nhập vào link phỏng vấn đúng thời gian để bắt đầu phỏng vấn.<br>
                Nếu có bất kỳ câu hỏi nào, vui lòng liên hệ trực tiếp với chúng tôi qua số điện thoại 0912345678 hoặc email joby@gmail.com.<br>
                Trân trọng,<br>Joby Hiring</html>`
        };
        try {
            const info = await transporter.sendMail(mailOptions);
            return { success: true, message: 'Email đã được gửi', info };
        } catch (err) {
            throw new Error(err.message);
        }
    }
}




module.exports = MailTime;
