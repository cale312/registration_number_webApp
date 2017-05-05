'use strict';
module.exports = function(app) {
  var mongoose = require('mongoose');
  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('We are connected');
  });

  const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/regnumbers";
  mongoose.connect(mongoURL);

  var plateSchema = mongoose.Schema({
    plate: String,
    plateCount: Number
  });
  var regnumbers = mongoose.model('regnumbers', plateSchema);

  var plates = [];
  var plateList = {};
  for (var i = 0; i < plateList.length; i++) {}

  //search if plate already exists in the database
  function managePlates(newPlate, fn) {
    regnumbers.findOne({
      plate: newPlate
    }, function(err, plateFound) {
      if (plateFound) {
        regnumbers.update({
          plate: newPlate,
          plateCount: plateFound.plateCount + 1
        }, fn);
        return;
      } else {
        regnumbers.create({ plate: newPlate, plateCount: 1}, fn);
        return;
      }
    });
  }

  var filterdPlates = [];
  var DBPlates = [];

  regnumbers.find({}, function(err, plate) {
    for (var i = 0; i < plate.length; i++) {
      var dbPlate = plate[i].plate;
      DBPlates.push(dbPlate);
    }
    console.log(DBPlates);
  });

  function getPlates(city) {
    filterdPlates = [];

    for (var i = 0; i < DBPlates.length; i++) {
      var curPlate = DBPlates[i];
      if (city === 'Stellenbosch' && curPlate.startsWith('cl')) {
        filterdPlates.push(curPlate);
      } else if (city === 'Cape Town' && curPlate.startsWith('ca')) {
        filterdPlates.push(curPlate);
      } else if (city === 'Bellville' && curPlate.startsWith('cy')) {
        filterdPlates.push(curPlate);
      } else if (city === 'Paarl' && curPlate.startsWith('cj')) {
        filterdPlates.push(curPlate);
      } else if (city === 'All') {
        filterdPlates = DBPlates;
      }
    }
    return filterdPlates;
  }

  app.get('/', function(req, res) {
    res.render('reg_numbers', {plate: DBPlates});
    console.log('user on route: ' + req.url);
  });

  app.post('/reg_numbers', function(req, res, next) {
    console.log('user on route: ' + req.url);
    var newPlate = req.body.regNumberInput;
    var add = req.body.add;
    var filter = req.body.filter;
    var city = req.body.city;

    if (add) {
      if (plateList[newPlate] === undefined && newPlate !== "") {
        plateList[newPlate] = 1;
        DBPlates.push(newPlate);
        res.render('reg_numbers', {
          plate: DBPlates
        });
        managePlates(newPlate, function(err) {if (err) {console.log(err);}});
      } else {
        res.render('reg_numbers', { plate: DBPlates});
      }
    } else if (filter) {
      if (city) {
        var getPlatesResults = getPlates(city);
        res.render('reg_numbers', {plate: getPlatesResults});
      } else {
        res.render('reg_numbers', {
          plate: DBPlates
        });
      }
    }
  });
};
