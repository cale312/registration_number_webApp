
var express = require('express');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var plateList = {};
var platesList = [];

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected');
});

mongoose.connect('mongodb://localhost/regnumber');

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
var port = process.env.PORT || 5001;

app.get('/', function (req, res){
  res.render('index', {});
});

app.get('/reg_numbers', function (req, res){
  res.render('reg_numbers', {});
});

app.post('/reg_numbers', function (req, res) {
  for (var i = 0; plateList.length; i++) {}

  var plateInput = req.body.regNumberInput;
  var addBtn = req.body.addBtn;
  var filterBtn = req.body.filterBtn;
  var city = req.body;
  var filterd = [];

  if (addBtn) {
    if (plateList[plateInput] === undefined && plateInput !== "") {
      plateList[plateInput] = 1;
      platesList.push(plateInput);
      res.render('reg_numbers', {plateList: platesList});
    } else {
      res.render('reg_numbers', {});
    }
  } else if (filterBtn) {
    for (var i = 0; i < platesList.length; i++) {
      if (city === 'paarl' && platesList[i].startsWith('CL')) {
        platesList[i].style.textDecoration = 'underline';
        filterd.push(plates[i])
        res.render('reg_numbers', {plateList: filterd})
      }
    }
  }
  console.log(city);
  console.log(platesList);
});

app.listen(port, function () {
  console.log('Our app is running on http://localhost:' + port);
})
