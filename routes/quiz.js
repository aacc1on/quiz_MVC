// ====== routes/quiz.js ======
const express = require('express');
const router = express.Router();
const QuizController = require('../controllers/quizController');

router.get('/', QuizController.showQuiz);
router.post('/submit', QuizController.submitQuiz);

module.exports = router;