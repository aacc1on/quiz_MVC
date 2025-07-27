// ====== models/Quiz.js ======
class Quiz {
  constructor() {
    this.questions = [];
    this.createdAt = new Date();
  }

  static currentQuiz = null;

  static create(questions) {
    const quiz = new Quiz();
    quiz.questions = questions;
    Quiz.currentQuiz = quiz;
    return quiz;
  }

  static getCurrent() {
    return Quiz.currentQuiz;
  }

  static exists() {
    return Quiz.currentQuiz && Quiz.currentQuiz.questions.length > 0;
  }

  getQuestions() {
    return this.questions;
  }

  getQuestionCount() {
    return this.questions.length;
  }

  checkAnswers(userAnswers) {
    let score = 0;
    let wrongAnswers = [];
    let detailedResults = [];

    this.questions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      const isCorrect = userAnswer === question.correct;
      
      if (isCorrect) {
        score++;
      } else {
        wrongAnswers.push({
          questionNumber: index + 1,
          question: question.question,
          word: question.word,
          correctAnswer: question.correct,
          userAnswer: userAnswer || 'No answer',
          options: question.options
        });
      }

      detailedResults.push({
        questionNumber: index + 1,
        question: question.question,
        word: question.word,
        correctAnswer: question.correct,
        userAnswer: userAnswer || 'No answer',
        isCorrect: isCorrect,
        options: question.options
      });
    });

    return {
      score,
      total: this.questions.length,
      percentage: Math.round((score / this.questions.length) * 100),
      wrongAnswers,
      detailedResults
    };
  }
}

module.exports = Quiz;
