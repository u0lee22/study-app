(function () {
    angular.module('validation')
        .provider('validation', validationProvider);

    function validationProvider() {
        var objValue = {};
        var option = {
            key: 'key',
            msg: 'msg',
            validationMsg: 'validationMsg',
            isNullCheck: 'isNullCheck',
            isCompare: 'isCompare',
            compare: 'compare',
            regex: 'regex',
            regexType: 'regexType'
        };

        var compareType = {
            EQUAL: 'equal',
            NOT_EQUAL: 'notEqual',
            GREATER_THAN: 'greaterThan',
            GREATER_OR_EQUAL: 'greater_or_equal',
            LESS_THAN: 'lessThan',
            LESS_OR_EQUAL: 'less_or_equal',
            SIZE_GREATER_THAN: 'sizeGreaterThan',
            SIZE_LESS_THAN: 'sizeLessThan'
        };

        return {
            compare: compareType,

            /**
             * 각 key에 유효성 체크사항을 object에 정의하는 함수
             * @param key config에서 .으로 구분해 받은 key의 마지막 값
             * @param obj key : config에서 입력받은 key
             *            type : 입력받은 값의 type
             *            isNullCheck : null인지 체크 (default: true)
             *            regex : 체크할 정규식 key
             *            regexType : 입력받은 체크할 정규식
             * @returns {{value: *, properties: *}}
             */
            setOption: function (key, obj) {
                var value;
                var childVal;
                if (angular.isDefined(obj['type'])) {
                    if (angular.isDefined(obj['genericType'])) {
                        childVal = objValue[obj['genericType']]
                        value = obj['type'] === 'array' ? [childVal] : angular.copy(childVal)
                        value.type = obj['type']
                        value.genericType = obj['genericType']
                    }
                    else {
                        value = {}
                    }
                }
                else {
                    if (angular.isDefined(obj['genericType'])) {
                        value = angular.copy(objValue[obj['genericType']])
                        value.type = obj['type']
                        value.genericType = obj['genericType']
                    }
                    else {
                        value = {};
                        value.properties = {
                            key: key,
                            msg: angular.isUndefined(obj.msg) || obj.msg === '' ? '기본정보' : obj.msg,
                            validationMsg: angular.isUndefined(obj.validationMsg) || obj.validationMsg === '' ? '입력하지 않은 정보가 있습니다.' : obj.validationMsg,
                            isNullCheck: angular.isUndefined(obj.isNullCheck) ? true : obj.isNullCheck,
                            isCompare: obj.isCompare,
                            compare: obj.compare,
                            regex: obj.regex,
                            regexType: obj.regexType
                        }
                    }
                }
                return value
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

                value = angular.isUndefined(value) ? {} : this.setOption(keys[keys.length - 1], value);

                keys.reduce(function (pv, cv, ci, a) {
                    if (ci == keys.length - 1) {
                        pv[a[ci]] = value;
                        return pv;
                    }
                    else {
                        return pv[a[ci]];
                    }
                }, objValue);
                console.log(objValue)
                return this;
            },


            $get: function () {
                return {
                    regexMap: {
                        'LOGIN_ID': /^[a-z0-9_.-]{5,20}$/,
                        'PASSWORD': /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-\\/|{}~])(?=.*[0-9]).{8,16}$/,
                        'NUMBER': /^[+-]?\d*(\.?\d*)$/,
                        'EMAIL': /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/,
                        'MOBILE': /^\d{2,3}-\d{3,4}-\d{4}$/
                    },

                    /**
                     * 입력받은 값(objInput)을 유효성 체크 목록(objValue)과 비교하여 유효성 체크
                     * @param keyConfig 비교할 objValue의 최상위 key값
                     * @param objInput 화면에서 입력받은 Object
                     * @returns {result}
                     */
                    getValidation: function (keyConfig, objInput) {
                        //TODO : key에 해당하는 설정 object를 입력받은 object와 비교 후 유효성 체크 결과 return
                        var keys = Object.keys(objValue[keyConfig]);
                        var values = Object.values(objValue[keyConfig]);
                        for (var i = 0; i < keys.length; i++) {
                            if (angular.isObject(values[i]) || angular.isArray(values[i])) {
                                if (!angular.isUndefined(values[i].properties)) {
                                    var result = this.checkValidation(values[i].properties, objInput);
                                    if (result != null) {
                                        return result.msg;
                                    }
                                }
                                else {
                                    var result = this.validationFunc(objValue[keyConfig][keys[i]], objInput[keys[i]]);
                                    if (result != null) {
                                        return result.msg;
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
                     * @returns {result}
                     */
                    validationFunc: function (keyObj, value) {
                        if (angular.isArray(value)) {
                            for (var i = 0; i < value.length; i++) {
                                return this.validationFunc(keyObj[i], value[i]);
                            }
                        }
                        else if (angular.isObject(value)) {
                            var keys = Object.keys(keyObj);
                            var values = Object.values(keyObj);
                            for (var i = 0; i < keys.length; i++) {
                                if (angular.isObject(values[i]) || angular.isArray(values[i])) {
                                    if (!angular.isUndefined(values[i].properties)) {
                                        var result = this.checkValidation(values[i].properties, value);
                                        if (result != null) {
                                            return result
                                        }
                                    } else {
                                        var result = this.validationFunc(keyObj[keys[i]], value[keys[i]]);
                                        if (result != null) {
                                            return result
                                        }
                                    }
                                }
                            }
                            return null;
                        }
                    },

                    /**
                     * 데이터 유효성 검사 함수
                     * @param setObj setOption로 설정된 유효성 체크 사항 Object
                     * @param inObj 입력받은 data
                     * @returns {{basic: boolean, msg: *}}
                     */
                    checkValidation: function (setObj, inObj) {
                        var value = inObj[setObj[option.key]];

                        //null Check
                        if (setObj[option.isNullCheck]) {
                            if (angular.isUndefined(value) || value == null || value === '')
                                return {basic: true, msg: setObj[option.msg]}
                        }

                        //regexMap에 정의된 정규식으로 유효성 Check
                        if (angular.isDefined(setObj[option.regex])) {
                            if (!(this.regexMap[setObj[option.regex]] == null || value == null ? false : this.regexMap[setObj[option.regex]].test(value))) {
                                return {basic: false, msg: setObj[option.msg] + '|' + setObj[option.validationMsg]}
                            }
                        }

                        //사용자 정의된 정규식으로 유효성 Check
                        if (angular.isDefined(setObj[option.regexType])) {
                            if (!(value == null ? false : setObj[option.regexType].test(value))) {
                                return {basic: false, msg: setObj[option.msg] + '|' + setObj[option.validationMsg]}
                            }
                        }

                        //다른 컬럼과 비교하여 유효성 Check
                        if (angular.isDefined(setObj[option.isCompare])) {
                            var result;
                            var compareTo = inObj[setObj[option.compare]];

                            switch (setObj[option.isCompare]) {
                                case compareType.EQUAL:
                                    result = value === compareTo;
                                    break;
                                case compareType.NOT_EQUAL:
                                    result = value !== compareTo;
                                    break;
                                case compareType.GREATER_THAN:
                                    result = value > compareTo;
                                    break;
                                case compareType.GREATER_OR_EQUAL:
                                    result = value >= compareTo;
                                    break;
                                case compareType.LESS_THAN:
                                    result = value < compareTo;
                                    break;
                                case compareType.LESS_OR_EQUAL:
                                    result = value <= compareTo;
                                    break;
                                case compareType.SIZE_EQUAL:
                                    var size = getSize(value);
                                    result = size != null && size == compareTo;
                                    break;
                                case compareType.SIZE_GREATER_THAN:
                                    var size = getSize(value);
                                    result = size != null && size > compareTo;
                                    break;
                                case compareType.SIZE_LESS_THAN:
                                    var size = getSize(value);
                                    result = size != null && size < compareTo;
                                    break;
                                default :
                                    result = value === compareTo;
                                    break
                            }

                            if (!result) {
                                return {basic: false, msg: setObj[option.msg] + '|' + setObj[option.validationMsg]}
                            }
                        }

                    }
                }
            }
        };
    }
})();