module.exports = {
  home: {
    get: function(req, res) {
      res.render('general/home');
    }
  },
  about: {
    get: function(req, res) {
      res.render('general/about');
    }
  }
};