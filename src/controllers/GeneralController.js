module.exports = {
  home: function(req, res) {
    res.render('general/home');
  },
  about: function(req, res) {
    res.render('general/about');
  }
};