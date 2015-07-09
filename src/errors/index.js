var requireDirectory = require('require-directory');

module.exports = requireDirectory(module, {
  exclude: 'index.js',
  visit: function(obj) {
    require('util').inherits(obj, Error);
    return obj;
  },
});