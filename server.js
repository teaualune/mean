'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
    config = require('./config/config'),
    mongoose = require('mongoose');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
    if (err) {
        console.error('\x1b[31m', 'Could not connect to MongoDB!');
        console.log(err);
    }
});

// Init the express application
var app = require('./config/express')(db);
var server = require('http').createServer(app);
var socketio = require('socket.io').listen(server);

// Bootstrapping
require('./config/passport')();
require('./config/socketio')(socketio);

// Start the app by listening on <port>
server.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);