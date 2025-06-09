const MailTime = require('../models/mailTimeModel');

exports.sendMail = async (req, res) => {
    try {
        const result = await MailTime.SendMail(req);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
