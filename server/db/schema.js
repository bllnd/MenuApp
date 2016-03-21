var path = require('path');
if(!process.env.DOMAIN) {
  var config = require('./config/config.js');
}
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DOMAIN || config.database.domain,
    user: process.env.USERNAME || config.database.username,
    password: process.env.PASSWORD || config.database.password,
    database: process.env.DATABASE || config.database.database,
    charset: process.env.CHARSET || config.database.charset
  }
});

var bookshelf = require('bookshelf')(knex);
var db = bookshelf;

//table containing information user enters when signing up
var users = function() {
  db.knex.schema.hasTable('users').then(function(exists) {
    if(!exists) {
      knex.schema.createTable('users', function(user) {
        user.increments('id').primary();
        user.string('first_name', 30);
        user.string('last_name', 30);
        user.string('email', 30).unique();
        user.string('password', 252);
        user.string('username', 30).unique();
      }).then(function(){
        console.log('users table has been created');
      })
    }
  });
}

var user_preferences = function() {
  db.knex.schema.hasTable('user_preferences').then(function(exists){
    if(!exists){
      knex.schema.createTable('user_preferences', function(preference){
        preference.increments('id').primary();
        preference.boolean('allergy');
        preference.boolean('favorite');
        preference.string('ingredient', 50);
        preference.integer('user_id').unsigned();
        preference.foreign('user_id').references('id').inTable('users');
      }).then(function() {
        console.log('user_preferences table has been created');
      })
    }
  });
}

var restaurants = function() {
  db.knex.schema.hasTable('restaurants').then(function(exists) {
    if(!exists){
      knex.schema.createTable('restaurants', function(restaurant) {
        restaurant.increments('id').primary();
        restaurant.string('restaurant_id', 50);
      }).then(function() {
        console.log('restaurants table has been created');
      });
    }
  });
}

var menu_items = function() {
  db.knex.schema.hasTable('menu_items').then(function(exists) {
    if(!exists){
      knex.schema.createTable('menu_items', function(menuitems) {
        menuitems.increments('id').primary();
        menuitems.string('item', 50);
        menuitems.integer('restaurant_id').unsigned();
        menuitems.foreign('restaurant_id').references('id').inTable('restaurants');
      }).then(function() {
        console.log('menu_items table has been created');
      });
    }
  });
}

var item_ratings = function() {
  db.knex.schema.hasTable('item_ratings').then(function(exists) {
    if(!exists){
      knex.schema.createTable('item_ratings', function(rating) {
        rating.increments('id').primary();
        rating.integer('rating');
        rating.integer('user_id').unsigned();
        rating.foreign('user_id').references('id').inTable('users');
        rating.integer('item_id').unsigned();
        rating.foreign('item_id').references('id').inTable('menu_items');
      }).then(function() {
        console.log('item_ratings table has been created');
      });
    }
  });
}


users();
user_preferences();
restaurants();
menu_items();
item_ratings();

module.exports.bookshelf = bookshelf;
