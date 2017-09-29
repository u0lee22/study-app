(function () {
    angular.module('study.app').config(validationConfig);

    validationConfig.$inject = ['validationProvider'];

    function validationConfig(validationProvider) {
        //TODO : validation service의 setValidation 함수호출 (key와 유효성 체크할 컬럼 오브젝트)
        //validationProvider.setValidation('USER', {});
    }
})
();

