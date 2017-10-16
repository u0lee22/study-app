(function () {
    angular.module('validation')
        .provider('validation', validationProvider);

    function validationProvider() {
        var arrValue = [];

        return {
            setValidation: function (key, obj) {
                //TODO : config에서 설정된 check항목 setting
                arrValue[key] = obj;
            },

            $get: function () {
                return {
                    getValidation: function (keyConfig, objInput) {
                        //TODO : key에 해당하는 설정 object를 입력받은 object와 비교 후 유효성 체크 결과 return

                        var keys = Object.keys(arrValue[keyConfig]);
                        var values = Object.values(arrValue[keyConfig]);
                        for (var i = 0; i < keys.length; i++) {
                            if (angular.isObject(values[i]) || angular.isArray(values[i])) {
                                if (!angular.isUndefined(values[i]['key'])) {
                                    var result = this.patternCheck(angular.isUndefined(values[i]['check']) ? 'EMPTY' : values[i]['check'], objInput[values[i]['key']]);
                                    if (result == false) {
                                        return values[i]['key'];
                                    }
                                }
                                else {
                                    var result = this.validationFunc(arrValue[keyConfig][keys[i]], objInput[keys[i]]);
                                    if (result != null) {
                                        return keys[i] + '|' + result;
                                    }
                                }
                            }
                        }
                        return null;
                    },

                    validationFunc: function (arr, value) {
                        if (angular.isArray(value)) {
                            for (var i = 0; i < value.length; i++) {
                                for (var j = 0; j < arr.length; j++) {
                                    return this.validationFunc(arr[j], value[i]);
                                }
                            }
                        }
                        else if (angular.isObject(value)) {
                            var keys = Object.keys(arr);
                            var values = Object.values(arr);
                            for (var i = 0; i < keys.length; i++) {
                                if (angular.isObject(values[i]) || angular.isArray(values[i])) {
                                    if (!angular.isUndefined(values[i]['key'])) {
                                        var result = this.patternCheck(angular.isUndefined(values[i]['check']) ? 'EMPTY' : values[i]['check'], value[values[i]['key']]);
                                        if (result == false) {
                                            return values[i]['key'];
                                        }
                                    } else {
                                        var result = this.validationFunc(arr[keys[i]], value[keys[i]]);

                                        if (result != null) {
                                            return keys[i] + '|' + result;
                                        }
                                    }
                                }
                            }
                            return null;
                        }
                    },

                    regexMap: {
                        'PASSWORD': /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-\\/|{}~])(?=.*[0-9]).{8,16}$/,
                        'NUMBER': /^[+-]?\d*(\.?\d*)$/,
                        'EMAIL': /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/,
                        'ID': /^[a-z0-9_.-]{5,20}$/,
                        'TEL': /^\d{2,3}-\d{3,4}-\d{4}$/
                    },

                    patternCheck: function (pattern, value) {
                        switch (pattern) {
                            case 'EMPTY' :
                                return !(angular.isUndefined(value) || value == null || value === '');
                                break;

                            default:
                                console.log(this.regexMap[pattern].test(value));
                                return this.regexMap[pattern] == null || value == null ? false : this.regexMap[pattern].test(value);
                                break;
                        }
                    }
                }
            }
        };
    }
})();

