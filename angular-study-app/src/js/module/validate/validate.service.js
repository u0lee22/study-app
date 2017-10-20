(function () {
    angular.module('validation')
        .provider('validation', validationProvider);

    function validationProvider() {
        var objValue = {};
        return {

            /**
             * 각 key에 유효성 체크사항을 object에 정의하는 함수
             * @param key config에서 .으로 구분해 받은 key의 마지막 값
             * @param obj key : config에서 입력받은 key
             *            type : 입력받은 값의 type
             *            isNullCheck : null인지 체크 (default: true)
             *            regex : 체크할 정규식 key
             *            regexType : 입력받은 체크할 정규식
             * @returns {{key: *, type, isNullCheck: boolean, regex: string, regexType: string}}
             */
            setOption: function (key, obj) {
                return {
                    key: key,
                    type: angular.isUndefined(obj.type) ? 'EMPTY' : obj.type,
                    isNullCheck: angular.isUndefined(obj.regex) ? true : obj.isNullCheck,
                    regex: angular.isUndefined(obj.regex) ? '' : obj.regex,
                    regexType: angular.isUndefined(obj.regexType) ? '' : obj.regexType
                };
            },

            /**
             * object에 유효성 검사할 목록의 구조 및 체크사항을 정의 하는 함수
             * @param key objValue의 key .으로 구분해서 계층설정
             * @param value : key에 할당되는 값 ({},[])
             * @returns {setValidation}
             */
            setValidation: function (key, value) {
                //TODO : config에서 설정된 check항목 setting
                var keys = key.split('.');
                value = angular.isString(value) ? objValue[value] : angular.isArray(value) ? [] : angular.isUndefined(value) ? {} : this.setOption(keys[keys.length - 1], value);
                keys.reduce(function (pv, cv, ci, a) {
                    if (ci == keys.length - 1) {
                        pv[a[ci]] = value;
                        return pv;
                    }
                    else {
                        return pv[a[ci]];
                    }
                }, objValue);
                return this;
            },


            $get: function () {
                return {
                    /**
                     * 입력받은 값(objInput)을 유효성 체크 목록(objValue)과 비교하여 유효성 체크
                     * @param keyConfig 비교할 objValue key값
                     * @param objInput 화면에서 입력받은 Object
                     * @returns {*}
                     */
                    getValidation: function (keyConfig, objInput) {
                        //TODO : key에 해당하는 설정 object를 입력받은 object와 비교 후 유효성 체크 결과 return
                        var keys = Object.keys(objValue[keyConfig]);
                        var values = Object.values(objValue[keyConfig]);
                        for (var i = 0; i < keys.length; i++) {
                            if (angular.isObject(values[i]) || angular.isArray(values[i])) {
                                if (!angular.isUndefined(values[i]['key'])) {
                                    var result = this.patternCheck(values[i]['type'], objInput[values[i]['key']]);
                                    if (result == false) {
                                        return keys[i];
                                    }
                                }
                                else {
                                    var result = this.validationFunc(objValue[keyConfig][keys[i]], objInput[keys[i]]);
                                    if (result != null) {
                                        return keys[i] + '|' + result;
                                    }
                                }
                            }
                        }
                        return null;
                    },

                    /**
                     * 입력받은 object의 하위 목록을 찾거나, 최하위 목록일 경우 유효성을 판단
                     * @param keyObj config에서 설정한 체크사항
                     * @param value getValidation에서 입력받은 objInput의 하위 값
                     * @returns {*}
                     */
                    validationFunc: function (keyObj, value) {
                        if (angular.isArray(value)) {
                            for (var i = 0; i < value.length; i++) {
                                return this.validationFunc(keyObj, value[i]);
                            }
                        }
                        else if (angular.isObject(value)) {
                            var keys = Object.keys(keyObj);
                            var values = Object.values(keyObj);
                            for (var i = 0; i < keys.length; i++) {
                                if (angular.isObject(values[i]) || angular.isArray(values[i])) {
                                    if (!angular.isUndefined(values[i]['key'])) {
                                        var result = this.patternCheck(values[i]['type'], value[values[i]['key']]);
                                        if (result == false) {
                                            return keys[i];
                                        }
                                    } else {
                                        var result = this.validationFunc(keyObj[keys[i]], value[keys[i]]);
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

                    /**
                     * 유효성 체크 함수
                     * @param pattern 유효성 체크 패턴
                     * @param value 유효성 체크 (입력된)값
                     * @returns {boolean}
                     */
                    patternCheck: function (pattern, value) {
                        console.log(pattern, value)
                        switch (pattern) {
                            case 'EMPTY' :
                                return !(angular.isUndefined(value) || value == null || value === '');
                                break;
                            default:
                                return this.regexMap[pattern] == null || value == null ? false : this.regexMap[pattern].test(value);
                                break;
                        }
                    }
                }
            }
        };
    }
})();