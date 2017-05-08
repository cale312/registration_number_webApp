'use strict';
module.exports = function(app) {
  var mongoose = require('mongoose');


  const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/regnumbers";
  mongoose.connect(mongoURL);

  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('We are connected');
  });

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
          $inc: {plateCount: 1}
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

  function reloadPlates() {
    regnumbers.find({}, function(err, plate) {
      for (var i = 0; i < plate.length; i++) {
        var dbPlate = plate[i].plate;
        plateList[dbPlate] = 1;
        DBPlates.push(dbPlate);
      }
    });
  }

  reloadPlates();

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

  function deletePlate(delPlate, fn) {
    var delPlate = delPlate;
    regnumbers.findOneAndRemove({plate: delPlate}, function(err) {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log('Plate removed from db');
        return;
      }
    });
  }

  app.get('/', function(req, res) {
    res.render('reg_numbers', {plate: DBPlates});
    console.log('user on route: ' + req.url);
  });

  app.post('/reg_numbers', function(req, res, next) {
    // city = req.params.city;
    console.log('user on route: ' + req.url);
    var newPlate = req.body.regNumberInput;
    var delPlate = req.body.plateToDelete;
    var add = req.body.add;
    var del = req.body.delete;
    var filter = req.body.filter;
    var city = req.body.city;

    if (add) {
      if (plateList[newPlate] === undefined && newPlate !== "") {
        newPlate = newPlate.toLowerCase();
        managePlates(newPlate, function(err) {if (err) {console.log(err);}});
        plateList[newPlate] = 1;
        DBPlates.push(newPlate);
        res.render('reg_numbers', {
          plate: DBPlates
        });
      } else {
        res.render('reg_numbers', {plate: DBPlates});
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
    } else if (del) {
      if (delPlate) {
        delPlate = delPlate.toLowerCase();
        DBPlates = [];
        delete plateList[delPlate];
        deletePlate(delPlate);
        reloadPlates();
        res.render('reg_numbers', {plate: DBPlates});
      } else {
        res.render('reg_numbers', {plate: DBPlates});
      }
    }
  });
};
