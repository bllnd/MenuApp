var express = require('express');
var request = require('request');
var jwt = require('jwt-simple');
var bodyParser = require('body-parser');

var restaurant = require('./db/models/Restaurant.js');
var menu = require('./db/models/Menu_Item.js');
var user = require('./db/models/User.js');
var item = require('./db/models/Item_Rating.js');
var userPreference = require('./db/models/User_Preference.js');
var db = require('./db/schema.js');
var Cache = require('./constructors/Cache.js');
var Utils = require('./utils.js');
var ratingsController = require('./controllers/ratingsController.js');
var recommendationsController = require('./controllers/recommendationsController.js');
var Item_Rating = './db/models/Item_Rating.js';
var profileController = require('./controllers/profileController.js');
var preferenceController = require('./controllers/preferenceController.js');

var app = express();

// Creates Cache to store restaurant IDs that correspond to empty menus
emptyMenus = new Cache('1 month ago', 86400000);

app.use(bodyParser.json());
require('./routes/routes.js')(app, express);

var port = process.env.PORT || 8000;


// test();

var server = app.listen(port, function() {
  console.log('http://localhost:' + port);
});


module.exports = app;
