(function () {

    angular.module('study.app')
        .controller('calController', calculatorCtrl);

    angular.module('study.app')
        .service('calService', calService);

    angular.module('study.app').value('result',0);

    angular.module('study.app')
        .directive('calDirective', function () {
           return {
               restrict: 'E',
               template : '<div class="col-sm-1 p-sm"><label class="form-control">{{resultVal}}</label></div>'
           }
        });

    calculatorCtrl.$inject = ['$scope','calService'];
    calService.$inject = ['$q','result']

    function calService($q,result) {
        this.calResult = function (value1, operator, value2) {
            switch (operator) {
                case '+' : result = value1 + value2;
                    break;
                case '-' : result = value1 - value2;
                    break;
                case '*' : result = value1 * value2;
                    break;
                case '/' : result = value1 / value2;
                    break;
                default :
                    result = value1 + value2;
            }
            return $q(function (reslove) {
                reslove('계산완료');
            });
        };
        this.get = function () {
            return $q(function (reslove) {
                reslove(result);
            })
        };
    }

    function calculatorCtrl($scope, calService) {
        $scope.value1 = 0;
        $scope.value2 = 0;
        $scope.operator = '+';

        $scope.resultCal = function () {
            calService.calResult($scope.value1, $scope.operator, $scope.value2).then
            (function (res) {
                calService.get().then(function (data) {
                    $scope.resultVal = data;
                });
            });
        };
    }
})();