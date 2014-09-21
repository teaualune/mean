'use strict';

angular.module('core').controller('HeaderCtrl', [
    '$scope',
    'Authentication',
    'CoreUtils',
    function ($scope, Authentication, CoreUtils) {
        $scope.authentication = Authentication;
        $scope.is = CoreUtils.isState;
    }
]);