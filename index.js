
var express = require('express');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var plateListController = require('./controllers/plateListController');
var app = express();

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

plateListController(app);

var port = process.env.PORT || 5001;
app.listen(port, function () {
  console.log('Our app is running on http://localhost:' + port);
})
