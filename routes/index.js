// ====== routes/index.js ======
const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/homeController');

router.get('/', HomeController.showHome);

module.exports = router;