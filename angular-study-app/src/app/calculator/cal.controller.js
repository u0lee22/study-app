(function () {

    'use strict';

    angular.module('study.app')
        .controller('calController', calculatorCtrl);

    calculatorCtrl.$inject = ['$scope'];

    function calculatorCtrl($scope) {
        $scope.value1 = 0;
        $scope.value2 = 0;
        $scope.operator = '+';
    }
})();