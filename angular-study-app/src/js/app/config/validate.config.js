(function () {
    angular.module('study.app').config(validationConfig);

    validationConfig.$inject = ['validationProvider'];

    function validationConfig(validationProvider) {
        console.log('validationConfig');
        validationProvider.setValidation('USER', {
            'id': {key: 'id', inValid: 'ID'},
            'password': {key: 'password', inValid: 'PASSWORD'},
            'name': {key: 'name', inValid: 'NAME'},
            'mobile': {key: 'mobile', inValid: 'PHONE'},
            'email': {key: 'email', inValid: 'MAIL'}
        });
    }
})
();

