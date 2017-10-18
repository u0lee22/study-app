(function () {
    angular.module('validation')
        .provider('validation', validationProvider);

    function validationProvider() {
        var objValue = {};
        return {
            setOption: function (key, check) {
                return angular.isUndefined(key) ? {} : {key: key, check: angular.isUndefined(check) ? 'EMPTY' : check}
            },

            setValidation: function (key, obj) {
                //TODO : config에서 설정된 check항목 setting
                var keys = key.split('.');
                var parent = keys.reduce(function (pv, cv) {
                    console.log(pv, cv, keys[keys.length - 1]);
                    if (cv == keys[keys.length - 1]) {
                        if (pv) {
                            var pvObj = objValue[pv];
                            pvObj[cv] = obj;
                            objValue[pv] = pvObj;
                        }
                        else {
                            objValue[cv] = obj
                        }
                    }
                    return pv ? pv : cv;
                }, null);
                console.log(objValue)
                return this;
            },


            $get: function () {
                return {
                    getValidation: function (keyConfig, objInput) {
                        //TODO : key에 해당하는 설정 object를 입력받은 object와 비교 후 유효성 체크 결과 return
                        var keys = Object.keys(objValue[keyConfig]);
                        var values = Object.values(objValue[keyConfig]);
                        for (var i = 0; i < keys.length; i++) {
                            if (angular.isObject(values[i]) || angular.isArray(values[i])) {
                                if (!angular.isUndefined(values[i]['key'])) {
                                    var result = this.patternCheck(values[i]['check'], objInput[values[i]['key']]);
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
                                        var result = this.patternCheck(values[i]['check'], value[values[i]['key']]);
                                        if (result == false) {
                                            return values[i]['key'];
                                        }
                                        else {
                                            return result;
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

