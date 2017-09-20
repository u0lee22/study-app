(function () {
        angular.module('study.app')
            .directive('calDirective', ['calService', function (calService) {
                return {
                    restrict: 'E',
                    replace : true,
                    scope: {
                        resultVal : '&'
                    },
                    template: '<div class="container">' +
                    '        <div class="row">' +
                    '            <div class="col-sm-1 p-sm"><input type="number" class="form-control" type="text" ng-model="value1"></div>' +
                    '            <div class="col-sm-1 p-sm selectContainer">' +
                    '                <select class="form-control" ng-model ="operator">' +
                    '                    <option value="+">+</option>' +
                    '                    <option value="-">-</option>' +
                    '                    <option value="*">*</option>' +
                    '                    <option value="/">/</option>' +
                    '                </select>' +
                    '            </div>' +
                    '            <div class="col-sm-1 p-sm"><input type="number" class="form-control" type="text" ng-model="value2"></div>' +
                    '            <div class="col-sm-1 p-sm">' +
                    '                <button type="submit" class="btn btn-primary form-control" ng-click="resultVal()">=</button>' +
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