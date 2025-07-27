// ====== middlewares/authMiddleware.js ======
const requireAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    return next();
  }
  req.flash('error', 'Admin access required');
  res.redirect('/admin/login');
};

module.exports = { requireAdmin };
