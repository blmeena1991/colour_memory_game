/* Requirement */
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var compression = require('compression')
var path = require('path');
var fs = require('fs');

var mongoUri = 'mongodb://127.0.0.1:27017/accedo';
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', function () {
      throw new Error('unable to connect to database at ' + mongoUri);
});

var app = express();

/* Configuration */
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.set("view options", {layout: false});
app.use(express.static(path.join(__dirname, 'public')));

app.use(compression({
      threshold: 256
}))

app.use(bodyParser.json());

/** REST API **/
require('./models/users');
require('./routes')(app);

app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/high', function (req, res) {
    res.render('high.html');
});


//app.listen(process.env.PORT || 3000);
var server = app.listen(process.env.PORT || 3000, function() {
	console.log('Server running');
});
