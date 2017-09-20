(function () {
        angular.module('study.app')
            .directive('calDirective', ['calService', function (calService) {
                return {
                    restrict: 'E',
                    replace : true,
                    scope: {
                        value1: '=',
                        value2: '=',
                        operator: '=',
                        testValue: '@'
                    },
                    template: '<div class="container">' +
                    '        <div class="row">' +
                    '            <div class="col-sm-1 p-sm"><input type="number" class="form-control" type="text" ng-model="value1" ng-change="resultVal()"></div>' +
                    '            <div class="col-sm-1 p-sm selectContainer">' +
                    '                <select class="form-control" ng-model ="operator" ng-change="resultVal()">' +
                    '                    <option value="+">+</option>' +
                    '                    <option value="-">-</option>' +
                    '                    <option value="*">*</option>' +
                    '                    <option value="/">/</option>' +
                    '                </select>' +
                    '            </div>' +
                    '            <div class="col-sm-1 p-sm"><input type="number" class="form-control" type="text" ng-model="value2" ng-change="resultVal()"></div>' +
                    '            <div class="col-sm-1 p-sm">' +
                    '                <button class="btn btn-primary form-control" ng-click="resultVal()">=</button>' +
                    '            </div>' +
                    '            <div class="col-sm-1 p-sm"><label class="form-control">{{resCalc}}</label></div>' +
                    '        </div>' +
                    '    </div>',
                    link: function ($scope, element, attrs) {
                        $scope.resultVal = function() {
                            $scope.resCalc = calService.calc($scope.value1, $scope.operator, $scope.value2);

                        };
                    }
                }
            }]);
    }

)();