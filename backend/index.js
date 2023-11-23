

const express = require('express');
const questionRoutes = require('./routes/questions');
const { generateQuestionPaper } = require('./controllers/paperController');
const { sampleQuestions } = require('./data');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api', questionRoutes);

app.post('/api/generate-paper', async (req, res) => {
  const { totalMarks, distribution } = req.body;

  try {
   
    const questionPaper = await generateQuestionPaper(totalMarks, distribution, sampleQuestions);
    res.json({ questionPaper });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});