export default {
  home: (req, res) => {
    res.render('general/home');
  },
  about: (req, res) => {
    res.render('general/about');
  },
  hello: (req, res) => {
    res.render('general/helloworld', {
      todos: [],
    });
  },
};