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

  var plateSchema = mongoose.Schema({plate: String, plateCount: Number});
  var regnumbers = mongoose.model('regnumbers', plateSchema);

  var plates = [];
  var plateList = {};
  for (var i = 0; i < plateList.lenght; i++) {}

  //search if plate already exists in the database
  function managePlates(newPlate, fn) {
    regnumbers.findOne({plate: newPlate}, function(err, plateFound) {
      if (plateFound) {
        regnumbers.update({plate: newPlate}, {plateCount: Number(plateFound.plateCount) + 1}, fn);
        return;
      } else {
        regnumbers.create({plate: newPlate, plateCount: 1}, fn);
        return;
      }
    });
  }

  app.get('/', function (req, res){
    res.render('reg_numbers', {});
    console.log('user on route: ' + req.url);
  });

  app.post('/reg_numbers', function (req, res, next) {
    console.log('user on route: ' + req.url);
    var newPlate = req.body.regNumberInput;
    var add = req.body.add;
    var filter = req.body.filter;

    regnumbers.find({}, function(err, plateNumber) {
      for (var i = 0; i < plateNumber.length; i++) {
        var curObj = plateNumber[i].plate;
      }
    });
    if (add) {
      if (plateList[newPlate] === undefined && newPlate !== "") {
        plateList[newPlate] = 1;
        plates.push(newPlate);
        res.render('reg_numbers', {plate: plates});
        managePlates(newPlate)
        console.log(plates);
      } else {
        res.render('reg_numbers', {plate: plates});
      }
    }
  });

  app.delete('/reg_numbers', function (req, res) {
    console.log('user on route: ' + req.url);

  });
};
