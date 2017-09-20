(function () {
        angular.module('study.app')
            .service('calService', calService);
        function calService() {
            this.calc = function (value1, operator, value2) {
                switch (operator) {
                    case '-' :
                        return value1 - value2;
                    case '*' :
                        return value1 * value2;
                    case '/' :
                        return value1 / value2;
                    default :
                        return value1 + value2;
                }
            };
        }
    }
)();