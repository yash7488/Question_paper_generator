const express = require('express');
const router = express.Router();
const Question = require('../models/question');

// Route to fetch questions based on difficulty
router.get('/questions/:difficulty', async (req, res) => {
  const { difficulty } = req.params;

  try {
    const questions = await Question.find({ difficulty });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
