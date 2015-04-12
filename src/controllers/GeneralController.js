module.exports = {
  home: {
    get: function(req, res){
      res.render('home');
    }
  },
  about: {
    get: function(req, res) {
      res.render('about');
    }
  }
};