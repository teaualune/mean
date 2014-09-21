'use strict';

angular.module('core').config([
    'RestangularProvider',
    'cfpLoadingBarProvider',
    'ngDialogProvider',
    function (RestangularProvider, cfpLoadingBarProvider, ngDialogProvider) {

        RestangularProvider.setRestangularFields({
            id: '_id'
        });

        cfpLoadingBarProvider.lantencyThreshold = 1000;
        cfpLoadingBarProvider.includeSpinner = false;

        ngDialogProvider.setDefaults({
            className: 'ngdialog-theme-plain'
        });

    }
]);