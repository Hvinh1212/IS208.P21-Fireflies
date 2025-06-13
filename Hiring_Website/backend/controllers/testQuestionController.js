const TestQuestion = require('../models/testQuestionModel');

const testQuestionController = {
    getQuestionsByTestId: async (req, res) => {
        try {
            const questions = await TestQuestion.getAllByTestId(req.params.testId);
            res.json(questions);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getQuestionById: async (req, res) => {
        try {
            const question = await TestQuestion.getById(req.params.id);
            if (!question) {
                return res.status(404).json({ message: 'Question not found' });
            }
            res.json(question);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createQuestion: async (req, res) => {
        try {
            const question = await TestQuestion.create(req.body);
            res.status(201).json(question);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateQuestion: async (req, res) => {
        try {
            const question = await TestQuestion.update(req.params.id, req.body);
            if (!question) {
                return res.status(404).json({ message: 'Question not found' });
            }
            res.json(question);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteQuestion: async (req, res) => {
        try {
            const question = await TestQuestion.delete(req.params.id);
            if (!question) {
                return res.status(404).json({ message: 'Question not found' });
            }
            res.json({ message: 'Question deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = testQuestionController; 