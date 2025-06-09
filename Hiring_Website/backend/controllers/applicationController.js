const Application = require('../models/applicationModel');

exports.getApplications = async (req, res) => {
    try {
        const applications = await Application.getAll();
        res.status(200).json(applications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getApplicationById = async (req, res) => {
    const { id } = req.params;
    try {
        const application = await Application.getById(id);
        res.status(200).json(application);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getApplicationsByEmployerId = async (req, res) => {
    const { id } = req.params;
    try {
        const applications = await Application.getByEmployerId(id);
        res.status(200).json(applications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateApplicationStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedApplication = await Application.updateStatus(id, status);
        if (updatedApplication) {
            res.status(200).json({
                message: "Cập nhật trạng thái thành công",
                application: updatedApplication
            });
        } else {
            res.status(404).json({ message: "Không tìm thấy đơn ứng tuyển" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateApplicationVerification = async (req, res) => {
    const { id } = req.params;
    const { is_verify } = req.body;

    try {
        const updatedApplication = await Application.updateVerification(id, is_verify);
        if (updatedApplication) {
            res.status(200).json({
                message: "Cập nhật trạng thái xác thực thành công",
                application: updatedApplication
            });
        } else {
            res.status(404).json({ message: "Không tìm thấy đơn ứng tuyển" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};