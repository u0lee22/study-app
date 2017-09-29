(function () {
    angular.module('validation')
        .provider('validation', validationProvider);

    function validationProvider() {
        return {
            setValidation: function (key, obj) {
                //TODO : config에서 설정된 check항목 setting
            },

            $get: ['$parse', function ($parse) {
                return {
                    getValidation: function (key, object) {
                        //TODO : key에 해당하는 설정 object를 입력받은 object와 비교 후 유효성 체크 결과 return

                    }
                }
            }]

        };
    }
})();