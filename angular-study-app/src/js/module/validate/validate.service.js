(function () {
    angular.module('validation')
        .provider('validation', validationProvider);

    function validationProvider() {
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
        }

        var regexMap = {
            password: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-\\/|{}~])(?=.*[0-9]).{8,16}$/,
            MOBILE: /^[+-]?\d*(\.?\d*)$/,
            email: /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/,
            loginId: /^[a-z0-9_.-]{5,20}$/,
            mobile: /^\d{2,3}-\d{3,4}-\d{4}$/
        };

        var arrValidation = [];
        var resultVal = [];

        return {
            setValidation: function (key, obj) {
                for (var i in obj) {
                    arrValidation.push(this.getValidationOption(obj[i].key, obj[i].inValid, obj[i].pattern, obj[i].compareTo, obj[i].valid));
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

            $get: ['$parse', function ($parse) {
                return {
                    getValidation: function (object) {
                        var arr = [];
                        for (var i in arrValidation) {
                            var option = arrValidation[i];
                            var isValid = this.isValidValue($parse(option.key)(object), option.pattern, option.pattern === patterns.EQUAL_EACH_OTHER ? $parse(option.compareTo)(object) : option.compareTo);
                            arr.push({
                                isValid: isValid,
                                resultObject: isValid ? option.valid : option.inValid
                            });
                        }
                        resultVal = arr;
                        console.log(resultVal);
                        return resultVal;
                    },

                    isValidValue: function (value, pattern, compareTo) {
                        if (pattern == null || angular.isUndefined(pattern)) {
                            pattern = patterns.NOT_EMPTY;
                        }
                        switch (pattern) {
                            case patterns.NOT_EMPTY:
                                return !(angular.isUndefined(value) || value == null || value === '');
                                break;
                            case patterns.EMPTY:
                                return angular.isUndefined(value) || value == null || value === '';
                                break;
                            case patterns.NUMBER_TYPE:
                                return (typeof value === 'number') && regexMap[patterns.NUMBER].test(value);
                                break;
                            case patterns.EQUAL:
                            case patterns.EQUAL_EACH_OTHER:
                                return value === compareTo;
                                break;
                            case patterns.NOT_EQUAL:
                                return value !== compareTo;
                                break;
                            case patterns.GREATER_THAN:
                                return value > compareTo;
                                break;
                            case patterns.GREATER_OR_EQUAL:
                                return value >= compareTo;
                                break;
                            case patterns.LESS_THAN:
                                return value < compareTo;
                                break;
                            case patterns.LESS_OR_EQUAL:
                                gulp
                                return value <= compareTo;
                                break;
                            case patterns.SIZE_EQUAL:
                                var size = getSize(value);
                                return size != null && size == compareTo;
                                break;
                            case patterns.SIZE_GREATER_THAN:
                                var size = getSize(value);
                                return size != null && size > compareTo;
                                break;
                            case patterns.SIZE_LESS_THAN:
                                var size = getSize(value);
                                return size != null && size < compareTo;
                                break;
                            default:
                                return regexMap[pattern] == null || value == null ? false : regexMap[pattern].test(value);
                                break;
                        }
                    }
                }
            }]

        };
    }
})();