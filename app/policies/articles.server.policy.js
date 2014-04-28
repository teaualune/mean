'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Articles Permissions
 */
exports.invokeRolesPolicies = function() {
    acl.allow([{
        roles: ['admin'],
        allows: [{
            resources: '/articles',
            permissions: '*'
        }, {
            resources: '/articles/:articleId',
            permissions: '*'
        }]
    }, {
        roles: ['user'],
        allows: [{
            resources: '/articles',
            permissions: ['get', 'post']
        }]
    }]);
};

/**
 * Invoke Articles Permissions
 */
exports.invokeUserRolesPolicies = function(user) {
    if (user) {
        acl.addUserRoles(user._id.toString(), user.roles, function(err) {
            if (err) {
                console.log(err);
            }
        });
    }
};

/**
 * Check If Articles Policy Allows
 */
exports.isAllowed = function(req, res, next) {
    // First we get the user identifier and adjust the url
    var userIdentifier = req.user ? req.user._id.toString() : 'guest';

    // Then we set the permissions to the current article
    if (req.article && req.user && req.article.user.id === req.user.id) {
        acl.addUserRoles(userIdentifier, userIdentifier, function(err) {
            if (err) {
                console.log(err);
            } else {
                acl.allow(userIdentifier, '/articles/' + req.article._id.toString(), ['put', 'delete'], function(err) {
                    console.log(err);
                });
            }
        });
    }

    acl.allowedPermissions(userIdentifier, req.path, function(err, permissions) {
        console.log(req.path, req.method.toLowerCase(), permissions);
    });
    
    return acl.isAllowed(userIdentifier, req.path, req.method.toLowerCase(), function(err, allow) {
        if (err) {
            // An authorization error occurred.
            return res.send(500, 'Unexpected authorization error');
        }

        if (allow) {
            // Woohoo, access granted. Invoke next() 
            return next();
        } else {
            return res.send(403, {
                message: 'User is not authorized'
            });
        }
    });
};