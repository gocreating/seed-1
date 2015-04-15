var orm = require("orm");

// orm.connect("sqlite://db.sqlite", function (err, db) {
orm.connect('mongodb://root@localhost/seed', function(err, db) {
  if (err) throw err;

  var Person = db.define("person", {
      name      : String,
      surname   : String,
      age       : Number, // FLOAT
      male      : Boolean,
      continent : [ "Europe", "America", "Asia", "Africa", "Australia", "Antartica" ], // ENUM type
      photo     : Buffer, // BLOB/BINARY
      data      : Object // JSON encoded
  }, {
    methods: {
      fullName: function () {
        return this.name + ' ' + this.surname;
      }
    },
    validations: {
      age: orm.enforce.ranges.number(18, undefined, "under-age")
    }
  });

  db.sync(function() {    
    var newPerson = {};
    newPerson.surname = "Doe"
    Person.create(newPerson, function(err, results) {
      console.log('created!');
    });

    Person.find({ surname: "Doe" }, function (err, people) {
      people[0].age = 16;
      people[0].save(function (err) {
          // err.msg = "under-age";
      });
    });
  });
});

module.exports = orm;