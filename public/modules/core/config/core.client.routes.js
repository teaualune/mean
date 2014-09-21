'use strict';

angular.module('core').config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'modules/core/views/home.client.view.html'
        }).state('about', {
            url: '/about',
            templateUrl: 'modules/core/views/about.client.view.html'
        });
    }
]);