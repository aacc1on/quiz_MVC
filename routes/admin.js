// ====== routes/admin.js ======
const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const { requireAdmin } = require('../middlewares/authMiddleware');

router.get('/login', AdminController.showLogin);
router.post('/login', AdminController.login);
router.get('/dashboard', requireAdmin, AdminController.showDashboard);
router.post('/generate-quiz', requireAdmin, AdminController.generateQuiz);
router.get('/results', requireAdmin, AdminController.showResults);
router.post('/logout', AdminController.logout);

module.exports = router;