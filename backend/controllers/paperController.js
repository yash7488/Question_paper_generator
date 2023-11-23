const Question = require('../models/question');

const generateQuestionPaper = async (totalMarks, distribution, sampleQuestions) => {
  let questionPaper = [];

  const marksForDifficulty = {
    Easy: (distribution.Easy / 100) * totalMarks,
    Medium: (distribution.Medium / 100) * totalMarks,
    Hard: (distribution.Hard / 100) * totalMarks,
  };

  // Function to generate a single random question based on the marks distribution
  const generateRandomQuestion = (difficulty, remainingMarks) => {
    const questions = sampleQuestions.filter(question => question.difficulty === difficulty);
    const availableQuestions = questions.filter(question => question.marks <= remainingMarks);
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    return availableQuestions[randomIndex];
  };

  for (const difficulty in marksForDifficulty) {
    let requiredMarks = marksForDifficulty[difficulty];

    while (requiredMarks > 0) {
      const question = generateRandomQuestion(difficulty, requiredMarks);
      if (!question) break;

      questionPaper.push(question);
      requiredMarks -= question.marks;
    }
  }

  return questionPaper;
};

module.exports = { generateQuestionPaper };
