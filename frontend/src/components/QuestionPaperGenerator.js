import React, { useState } from 'react';

const QuestionPaperGenerator = () => {
  const [totalMarks, setTotalMarks] = useState(100);
  const [distribution, setDistribution] = useState({
    Easy: 20,
    Medium: 50,
    Hard: 30,
  });
  const [generatedPaper, setGeneratedPaper] = useState([]);

  const handleChange = (difficulty, value) => {
    setDistribution({ ...distribution, [difficulty]: parseInt(value, 10) || 0 });
  };

  const generateQuestionPaper = async () => {
    try {
      const response = await fetch('/api/generate-paper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ totalMarks, distribution }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      setGeneratedPaper(data.questionPaper);
    } catch (error) {
      console.error('Error generating question paper:', error);
    }
  };

  // Calculate total marks for each section and overall total marks
  const totalMarksEasy = generatedPaper.reduce(
    (acc, question) => (question.difficulty === 'Easy' ? acc + question.marks : acc),
    0
  );
  const totalMarksMedium = generatedPaper.reduce(
    (acc, question) => (question.difficulty === 'Medium' ? acc + question.marks : acc),
    0
  );
  const totalMarksHard = generatedPaper.reduce(
    (acc, question) => (question.difficulty === 'Hard' ? acc + question.marks : acc),
    0
  );
  const overallTotalMarks = totalMarksEasy + totalMarksMedium + totalMarksHard;

  return (
    <div>
      <h2>Question Paper Generator</h2>
      <div>
        <label>Total Marks: </label>
        <input
          type="number"
          value={totalMarks}
          onChange={(e) => setTotalMarks(parseInt(e.target.value, 10) || 0)}
        />
      </div>
      <div>
        <label>Distribution Percentage of Total Marks:</label>
        <div>
          <label>Easy%:</label>
          <input
            type="number"
            value={distribution.Easy}
            onChange={(e) => handleChange('Easy', e.target.value)}
          />
        </div>
        <div>
          <label>Medium%:</label>
          <input
            type="number"
            value={distribution.Medium}
            onChange={(e) => handleChange('Medium', e.target.value)}
          />
        </div>
        <div>
          <label>Hard%:</label>
          <input
            type="number"
            value={distribution.Hard}
            onChange={(e) => handleChange('Hard', e.target.value)}
          />
        </div>
      </div>
      <button onClick={generateQuestionPaper}>Generate Paper</button>

      {generatedPaper.length > 0 && (
        <div>
          <h3>Generated Paper</h3>
          <div>
            <h4>
              Total Marks - Easy: {totalMarksEasy}, Medium: {totalMarksMedium}, Hard: {totalMarksHard}, Overall: {overallTotalMarks}
            </h4>
          </div>
          <ul>
            {generatedPaper.map((question, index) => (
              <li key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <strong>Question:</strong> {question.question} <br />
                    <strong>Subject:</strong> {question.subject} <br />
                    <strong>Topic:</strong> {question.topic} <br />
                    <strong>Difficulty:</strong> {question.difficulty}
                  </div>
                  <div>
                    <strong>Marks:</strong> {question.marks}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuestionPaperGenerator;
