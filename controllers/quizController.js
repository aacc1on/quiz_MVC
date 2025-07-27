// ====== controllers/quizController.js ======
const Quiz = require('../models/Quiz');
const Result = require('../models/Result');

class QuizController {
  // Show quiz
  static showQuiz(req, res) {
    const currentQuiz = Quiz.getCurrent();
    
    if (!Quiz.exists()) {
      return res.render('quiz/no-quiz', {
        title: 'No Quiz Available'
      });
    }

    res.render('quiz/index', {
      title: 'English Vocabulary Quiz',
      questions: currentQuiz.getQuestions()
    });
  }

  // Submit quiz
  static submitQuiz(req, res) {
    const { name, surname, ...answers } = req.body;
    
    if (!name || !surname) {
      req.flash('error', 'Name and surname are required');
      return res.redirect('/quiz');
    }

    const currentQuiz = Quiz.getCurrent();
    if (!Quiz.exists()) {
      req.flash('error', 'No quiz available');
      return res.redirect('/quiz');
    }

    // Convert answers object to array
    const userAnswers = [];
    for (let i = 0; i < currentQuiz.getQuestionCount(); i++) {
      userAnswers[i] = answers[`question_${i}`];
    }

    // Check if all questions are answered
    const unanswered = userAnswers.findIndex(answer => !answer);
    if (unanswered !== -1) {
      req.flash('error', `Please answer question ${unanswered + 1}`);
      return res.redirect('/quiz');
    }

    const result = currentQuiz.checkAnswers(userAnswers);
    
    // Save result
    Result.create({
      name,
      surname,
      score: result.score,
      total: result.total,
      percentage: result.percentage,
      detailedResults: result.detailedResults
    });

    res.render('quiz/result', {
      title: 'Quiz Results',
      name,
      surname,
      score: result.score,
      total: result.total,
      percentage: result.percentage,
      wrongAnswers: result.wrongAnswers
    });
  }
}

module.exports = QuizController;