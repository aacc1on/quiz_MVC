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
  secret: process.env.SESSION_SECRET || 'quiz-app-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  }
}));

app.use(flash());

// Global variables for views
app.use((req, res, next) => {
  res.locals.isAdmin = req.session.isAdmin || false;
  res.locals.messages = req.flash();
  res.locals.currentPath = req.path;
  next();
});

// ====== ROUTES ======
const indexRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin');
const quizRoutes = require('./routes/quiz');

app.use('/', indexRoutes);
app.use('/admin', adminRoutes);
app.use('/quiz', quizRoutes);

// ====== ERROR HANDLING ======
// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { 
    title: 'Page Not Found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error stack:', err.stack);
  
  // Don't leak error details in production
  const errorMessage = process.env.NODE_ENV === 'production' 
    ? 'Something went wrong!' 
    : err.message;
    
  res.status(500).render('500', { 
    title: 'Server Error', 
    error: errorMessage
  });
});

// ====== SERVER START ======
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, () => {
  console.log('\n🚀 =======================================');
  console.log('   ENGLISH QUIZ APP STARTED SUCCESSFULLY');
  console.log('========================================');
  console.log(`🌐 Server: http://${HOST}:${PORT}`);
  console.log(`📱 Quiz: http://${HOST}:${PORT}/quiz`);
  console.log(`👤 Admin: http://${HOST}:${PORT}/admin`);
  console.log('========================================\n');
  
  // Environment check
  if (!process.env.OPENROUTER_API_KEY) {
    console.warn('⚠️  WARNING: OPENROUTER_API_KEY not found in environment variables');
    console.warn('   Quiz generation will not work without API key');
  }
  
  if (!process.env.SESSION_SECRET) {
    console.warn('⚠️  WARNING: Using default SESSION_SECRET (not secure for production)');
  }
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Server terminated');
  process.exit(0);
});