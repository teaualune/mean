'use strict';

/**
 * Module dependencies.
 */
var articlesPolicy = require('../../app/policies/articles.server.policy'),
	articles = require('../../app/controllers/articles.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/articles')
		.get(articlesPolicy.isAllowed, articles.list)
		.post(articlesPolicy.isAllowed, articles.create);
	
	app.route('/articles/:articleId')
		.get(articles.read)
		.put(articlesPolicy.isAllowed, articles.update)
	    .delete(articlesPolicy.isAllowed, articles.delete);

	// Finish by binding the article middleware
	app.param('articleId', articles.articleByID);
};