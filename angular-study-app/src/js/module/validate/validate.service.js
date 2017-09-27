(function () {
    angular.module('validation')
        .provider('validation', function () {
        var patterns = {
                PASSWORD: 'password',
                NUMBER: 'number',
                NUMBER_TYPE: 'numberType',
                EMAIL: 'email',
                EMPTY: 'empty',
                NOT_EMPTY: 'notEmpty',
                EQUAL: 'equal',
                NOT_EQUAL: 'notEqual',
                GREATER_THAN: 'greaterThan',
                GREATER_OR_EQUAL: 'greater_or_equal',
                LESS_THAN: 'lessThan',
                LESS_OR_EQUAL: 'less_or_equal',
                LOGIN_ID: 'loginId',
                SIZE_EQUAL: 'sizeEqual',
                SIZE_GREATER_THAN: 'sizeGreaterThan',
                SIZE_LESS_THAN: 'sizeLessThan',
                MOBILE: 'mobile',
                EQUAL_EACH_OTHER: 'equalEachOther'
            },

            arrValidation = [];

        return {
            setValidation: function (key, obj) {
                for (var i in obj) {
                    /*this.arrValidation.push(this.getValidationOption(obj[i].key, obj[i].inValid, obj[i].pattern, obj[i].compareTo, obj[i].valid));*/
                }
            },

            getValidationOption: function (key, inValid, pattern, compareTo, valid) {
                return {
                    key: key,
                    inValid: inValid,
                    pattern: pattern == null || angular.isUndefined(pattern) ? patterns.NOT_EMPTY : pattern,
                    compareTo: compareTo,
                    valid: valid
                }
            },

            $get: function () {
                function getValidation() {
                    return arrValidation;
                }
                return {getValidation: getValidation};
            }
        };
    })
})();