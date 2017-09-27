(function () {
    angular.module('validate').config(appConfig);

    appConfig.$inject = ['validationProvider'];

    function appConfig(validationProvider) {
        console.log('config');
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

