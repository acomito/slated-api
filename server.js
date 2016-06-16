// Dependencies
// -----------------------------------------------------
var express         = require('express');
var mongoose        = require('mongoose');
var port            = process.env.PORT || 3001;
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var app             = express();


// Express Configuration
// -----------------------------------------------------
// Sets the connection to MongoDB
mongoose.connect("mongodb://localhost/SlatedAutoComplete");

// Logging and Parsing
app.use(express.static(__dirname + '/public'));                 // sets the static files location to public
app.use('/modules',  express.static(__dirname + '/node_modules')); // Use BowerComponents
app.use(morgan('dev'));                                         // log with Morgan
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.urlencoded({extended: true}));               // parse application/x-www-form-urlencoded
app.use(bodyParser.text());                                     // allows bodyParser to look at raw text
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json
app.use(methodOverride());

// Routes
// ------------------------------------------------------
// require('./app/routes.js')(app);

app.use('/scripts', express.static(__dirname + '/node_modules/angular/'));
app.use('/scripts', express.static(__dirname + '/node_modules/jquery/'));
app.use('/scripts', express.static(__dirname + '/node_modules/modernizr/'));

// Listen
// -------------------------------------------------------
app.listen(port);
console.log('App listening on port ' + port);
