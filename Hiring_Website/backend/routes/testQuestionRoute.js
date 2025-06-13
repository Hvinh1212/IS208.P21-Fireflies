const express = require('express');
const router = express.Router();

const testQuestionController = require('../controllers/testQuestionController');

router.get('/test-questions/:testId', testQuestionController.getQuestionsByTestId);

router.get('/:id', testQuestionController.getQuestionById);

router.post('/test-questions', testQuestionController.createQuestion);

router.put('/:id', testQuestionController.updateQuestion);

router.delete('/test-questions/:id', testQuestionController.deleteQuestion);

module.exports = router; 