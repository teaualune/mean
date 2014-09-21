'use strict';

angular.module('core').service('CoreUtils', [
    '$state',
    'ngDialog',
    function ($state, ngDialog) {

        this.isState = function (state) {
            return $state.current.name.indexOf(state) >= 0;
        };

        this.confirm = function (message) {
            return ngDialog.openConfirm({
                template: 'confirm-template',
                data: {
                    message: message
                }
            });
        };

    }
]);