var General = require('./controllers/GeneralController');

module.exports = {
  '/': General.home,
  '/about': General.about
};