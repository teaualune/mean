'use strict';

var passport = require('passport'),
	User = require('mongoose').model('User'),
	path = require('path'),
	config = require('./config');

module.exports = function() {
	// Serialize sessions
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// Deserialize sessions
	passport.deserializeUser(function(id, done) {
		User.findOne({
			_id: id
		}, '-salt -password', function(err, user) {
	        // Invoking user policies
	        config.getGlobbedFiles('./app/policies/**/*.js').forEach(function(policyPath) {
	            require(path.resolve(policyPath)).invokeUserRolesPolicies(user);
	        }); 

			done(err, user);
		});
	});

	// Initialize strategies
	config.getGlobbedFiles('./config/strategies/**/*.js').forEach(function(strategy) {
		require(path.resolve(strategy))();
	});
};