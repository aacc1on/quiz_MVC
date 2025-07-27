// ====== controllers/homeController.js ======
class HomeController {
  static showHome(req, res) {
    res.render('index', {
      title: 'English Quiz Application'
    });
  }
}

module.exports = HomeController;