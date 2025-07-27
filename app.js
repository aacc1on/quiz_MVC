// ====== app.js (Main Application) ======
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const flash = require('express-flash');
const path = require('path');
require('dotenv').config();

const app = express();

// ====== VIEW ENGINE SETUP ======
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ====== MIDDLEWARE ======
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'quiz-app-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(flash());

// Global variables for views
app.use((req, res, next) => {
  res.locals.isAdmin = req.session.isAdmin || false;
  res.locals.messages = req.flash();
  next();
});

// ====== ROUTES ======
const indexRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin');
const quizRoutes = require('./routes/quiz');

app.use('/', indexRoutes);
app.use('/admin', adminRoutes);
app.use('/quiz', quizRoutes);

// Error handling
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { title: 'Server Error', error: err });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Quiz App running on http://localhost:${PORT}`);
  console.log(`👤 Admin panel: http://localhost:${PORT}/admin`);
  console.log(`📝 Quiz page: http://localhost:${PORT}/quiz`);
});
