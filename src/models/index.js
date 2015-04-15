var orm      = require('orm');
var settings = require('../configs/settings');

var connection = null;

function setup(db, cb) {
  require('./testmodel')(orm, db);
  // require('./message')(orm, db);
  // require('./comment')(orm, db);
  fakedata(db);

  return cb(null, db);
}

function fakedata(db) {
  db.sync(function() {    
    var newPerson = {};
    newPerson.surname = "Doe"
    db.models.person.create(newPerson, function(err, results) {
      console.log('created!');
    });

    db.models.person.find({ surname: "Doe" }, function (err, people) {
      people[0].age = 16;
      people[0].save(function (err) {
          // err.msg = "under-age";
      });
    });
  });
}

module.exports = function (cb) {
  if (connection) return cb(null, connection);

  orm.connect(settings.db, function(err, db) {
    if (err) return cb(err);

    connection = db;
    db.settings.set('instance.returnAllErrors', true);
    setup(db, cb);
  });
};