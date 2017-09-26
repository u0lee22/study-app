app.provider('validation', function () {
    var objValidation;
    var arrValidation;

    return {
        setArrValidation: function (arr) {
            arr.forEach(function (item) {
                arrValidation.push(this.setObjValidation(item.key, item.inValid, item.pattern, item.compareTo, item.valid));
            });
        },

        setObjValidation: function (key, inValid, pattern, compareTo, valid) {
            var patterns = {NOT_EMPTY: 'notEmpty'};

            return objValidation = {
                key: key,
                inValid: inValid,
                pattern: pattern == null || angular.isUndefined(pattern) ? patterns.NOT_EMPTY : pattern,
                compareTo: compareTo,
                valid: valid
            };
        },

        $get: function () {
            function getArrValidation() {
                return arrValidation;
            }

            return {variable: getArrValidation};
        }
    };
});


angular.module('study.app')
    .config(appConfig);

appConfig.$inject = ['validationProvider'];

function appConfig(validationProvider) {
    var userValidation = [
        {key :'loginId', inValid:'SUBSCRIBER_ID'},
        {key :'password', invalid:'password'},
        {key :'name', invalid:'NAME'}
    ];

    validationProvider.setArrValidation(userValidation);
}