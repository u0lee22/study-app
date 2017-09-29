(function () {
    angular.module('study.app').config(validationConfig);

    validationConfig.$inject = ['validationProvider'];

    function validationConfig(validationProvider) {
        validationProvider.setValidation('USER', {
            'id': {key: 'id', inValid: 'ID'},
            'pw': {key: 'password', inValid: 'PASSWORD'},
            'name': {key: 'name', inValid: 'NAME'},
            'mobile': {key: 'mobile', inValid: 'MOBILE'}
        });
    }
})
();

