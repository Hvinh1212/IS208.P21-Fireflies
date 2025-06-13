const Test = require('../models/jobTestModel');

const jobTestController = {
    getAllTests: async (req, res) => {
        try {
            const tests = await Test.getAll();
            res.json(tests);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getTestById: async (req, res) => {
        try {
            const test = await Test.getById(req.params.id);
            if (!test) {
                return res.status(404).json({ message: 'Test not found' });
            }
            res.json(test);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createTest: async (req, res) => {
        try {
            const test = await Test.create(req.body);
            res.status(201).json(test);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Update test
    updateTest: async (req, res) => {
        try {
            const test = await Test.update(req.params.id, req.body);
            if (!test) {
                return res.status(404).json({ message: 'Test not found' });
            }
            res.json(test);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Delete test
    deleteTest: async (req, res) => {
        try {
            const test = await Test.delete(req.params.id);
            if (!test) {
                return res.status(404).json({ message: 'Test not found' });
            }
            res.json({ message: 'Test deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = jobTestController;
