// ====== controllers/adminController.js ======
const Admin = require('../models/Admin');
const Quiz = require('../models/Quiz');
const Result = require('../models/Result');
const AIService = require('../services/aiService');

class AdminController {
  // Show login form
  static showLogin(req, res) {
    if (req.session.isAdmin) {
      return res.redirect('/admin/dashboard');
    }
    res.render('admin/login', { 
      title: 'Admin Login',
      defaultCredentials: !Admin.isConfigured()
    });
  }

  // Handle login
  static async login(req, res) {
    const { username, password } = req.body;

    if (Admin.validate(username, password)) {
      req.session.isAdmin = true;
      req.flash('success', 'Login successful');
      res.redirect('/admin/dashboard');
    } else {
      req.flash('error', 'Invalid credentials');
      res.redirect('/admin/login');
    }
  }

  // Show dashboard
  static showDashboard(req, res) {
    const currentQuiz = Quiz.getCurrent();
    const resultsCount = Result.getCount();
    
    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      hasQuiz: Quiz.exists(),
      quizQuestionCount: currentQuiz ? currentQuiz.getQuestionCount() : 0,
      resultsCount
    });
  }

  // Generate quiz
  static async generateQuiz(req, res) {
    try {
      const { text } = req.body;
      
      if (!text || text.trim().length < 20) {
        req.flash('error', 'Text must be at least 20 characters long');
        return res.redirect('/admin/dashboard');
      }

      const questions = await AIService.generateQuizFromText(text);
      Quiz.create(questions);
      
      req.flash('success', `Quiz generated successfully with ${questions.length} questions!`);
      res.redirect('/admin/dashboard');
    } catch (error) {
      console.error('Quiz generation error:', error);
      req.flash('error', `Failed to generate quiz: ${error.message}`);
      res.redirect('/admin/dashboard');
    }
  }

  // Show results
  static showResults(req, res) {
    const results = Result.getAll();
    res.render('admin/results', {
      title: 'Quiz Results',
      results
    });
  }

  // Logout
  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destroy error:', err);
      }
      res.redirect('/admin/login');
    });
  }
}

module.exports = AdminController;