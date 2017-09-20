(function () {

    'use strict';

    angular.module('study.app')
        .controller('calController', calculatorCtrl);

    calculatorCtrl.$inject = ['$scope'];

    function calculatorCtrl($scope) {
        $scope.value1 = 1;
        $scope.value2 = 1;
        $scope.operator = '+';
    }
})();