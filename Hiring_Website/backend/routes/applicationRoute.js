const express = require('express');
const router = express.Router()

const applicationController = require("../controllers/applicationController");

router.get('/applications', applicationController.getApplications);
router.get('/applications/:id', applicationController.getApplicationById);
router.get('/applications/employer/:id', applicationController.getApplicationsByEmployerId);
router.put('/applications/:id/status', applicationController.updateApplicationStatus);
router.put('/applications/:id/verify', applicationController.updateApplicationVerification);

module.exports = router;