(function () {
    angular.module('validation')
        .provider('validation', validationProvider);

    function validationProvider() {
        var objValue = {};
        var option = {
            key: 'key',
            nullMsg: 'nullMsg',
            validationMsg: 'validationMsg',
            isNullCheck: 'isNullCheck',
            compareType: 'compareType',
            compareTo: 'compareTo',
            regex: 'regex',
            regexType: 'regexType'
        };

        var compareType = {
            EQUAL: 'equal',
            NOT_EQUAL: 'notEqual',
            GREATER_THAN: 'greaterThan',
            GREATER_OR_EQUAL: 'greaterOrEqual',
            LESS_THAN: 'lessThan',
            LESS_OR_EQUAL: 'lessOrEqual',
            SIZE_GREATER_THAN: 'sizeGreaterThan',
            SIZE_LESS_THAN: 'sizeLessThan'
        };

        /**
         * 입력받은 컬럼의 체크사항을 setting
         * @param key
         * @param obj
         * @returns {
             *      key : validation 컬럼의 key
             *      type : 입력받은 데이터의 type (string, number, date, ...)
             *      msg : 입력값이 null 출력될 message
             *      validationMsg : 데이터 검증 후 false일 경우 출력될 message
             *      isNullCheck : null check 여부
             *      isCompare : 비교 조건
             *      compare : 비교할 컬럼의 key
             *      regex : regexMap에 정의된 정규식의 key값
             *      regexType : 정의 되지 않은 임의의 정규식
             * }
         */
        function setOption(config) {
            var value = {};
            value.properties = config

            if (config.type) {
                value.type = config.type;
            }
            if (config.genericType) {
                value = angular.extend(angular.copy(objValue[config.genericType]), value);
                value.genericType = config.genericType
            }
            value.properties.nullMsg = angular.isUndefined(value.properties.nullMsg) || value.properties.nullMsg === '' ? 'BASIC_INFORMATION' : value.properties.nullMsg;
            value.properties.validationMsg = angular.isUndefined(value.properties.validationMsg) || value.properties.validationMsg === '' ? 'SENTENCE_106' : value.properties.validationMsg;

            return value
        }

        return {
            compare: compareType,

            /**
             * object에 유효성 검사할 목록의 구조 및 체크사항을 정의 하는 함수기
             * @param key objValue의 key '.'으로 구분해서 계층설정
             * @param value : 계층이나 유효성체크사항 설정
             * @returns {setValidation}
             */
            setConfigValidation: function (key, value) {
                //TODO : config에서 설정된 check항목 setting
                if (key.indexOf('.') === -1) {
                    objValue[key] = value ? setOption(value) : {};
                } else {
                    key.split('.').reduce(function (pv, cv, ci, a) {
                        if (ci === a.length - 1) {
                            if (!pv.fieldInfo) pv.fieldInfo = {};
                            pv.fieldInfo[cv] = value ? setOption(value) : {};
                        }
                        return ci === 0 ? pv[cv] : pv.fieldInfo[cv];
                    }, objValue);
                }
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

                    arrayValidator: function (config, inputArr) {

                        console.log(inputArr)
                        console.log(config.fieldInfo)
                        console.log(config.properties)

                        if (config.properties) {
                            var result = this.checkValidation(config.properties, inputArr[i]);
                            if (result != null) {
                                return result
                            }
                        }
                        if (config.fieldInfo) {
                            var keys = Object.keys(config.fieldInfo);
                            for (var i = 0; inputArr.length; i++) {
                                for (var j = 0; j < keys.length; j++) {
                                    var result = this.getResultValidation(keys[j], inputArr[i], config.fieldInfo);
                                    if (result != null) {
                                        return result
                                    }
                                }
                            }
                            return null
                        }
                    },

                    objectValidator: function (config, inputObj) {
                        if (config.properties) {
                            var result = this.checkValidation(config.properties, inputObj[config], inputObj);
                            if (result != null)
                                return result
                        }

                        if (config.fieldInfo) {
                            var keys = Object.keys(config.fieldInfo);
                            for (var i = 0; i < keys.length; i++) {
                                var result = this.getResultValidation(keys[i], inputObj, config.fieldInfo);
                                if (result != null) {
                                    return result
                                }
                            }
                        }
                        return null
                    },

                    dispatcherFunction: function (config, inputObj) {
                        var keys = Object.keys(config.fieldInfo);
                        for (var i = 0; i < keys.length; i++) {
                            var fieldKey = keys[i];
                            var fieldConfig = config.fieldInfo[fieldKey];
                            var result = null

                            switch (fieldConfig.type) {
                                case 'array':
                                    result = this.arrayValidator(fieldConfig, inputObj[fieldKey]);
                                    if (result != null)
                                        return result
                                    break;
                                case 'object':
                                    result = this.objectValidator(fieldConfig, inputObj[fieldKey]);
                                    if (result != null)
                                        return result
                                    break;
                                default:
                                    result = this.checkValidation(fieldConfig.properties, inputObj[fieldKey], angular.isUndefined(fieldConfig.properties.compareTo) ? null : inputObj[fieldConfig.properties.compareTo], name);
                                    if (result != null)
                                        return result
                                    break;
                            }
                        }
                        return null
                    },

                    getResultValidation: function (key, inputObj, parentConfig) {
                        var config = objValue[key] || parentConfig[key];
                        if (config.fieldInfo) {
                            var result = this.dispatcherFunction(config, inputObj);
                            if (result != null) {
                                return result
                            }
                        }
                        if (config.properties) {
                            var result = this.checkValidation(config.properties, inputObj[key], inputObj);
                            if (result != null) {
                                return result
                            }
                        }
                        return null
                    },


                    /**
                     * 데이터 유효성 검사 함수
                     * @param setObj setOption로 설정된 유효성 체크 사항 Object
                     * @param inObj 입력받은 data
                     * @returns {{basic: boolean, msg: *}}
                     *
                     *
                     * compareTo -> parent
                     */
                    checkValidation: function (key, parentConfig, parentInputValue, parent, name) {
                        console.log('name ::: ', config, inputValue, parent, name)

                        //null Check
                        if (config[option.isNullCheck]) {
                            console.log((angular.isUndefined(inputValue) || inputValue == null || inputValue === ''))
                            if (angular.isUndefined(inputValue) || inputValue == null || inputValue === '') {
                                console.log(inputValue)
                                return {basic: true, msg: config[option.nullMsg]}
                            }
                        }

                        //regexMap에 정의된 정규식으로 유효성 Check
                        if (angular.isDefined(config[option.regex])) {
                            if (!(this.regexMap[config[option.regex]] == null || inputValue == null ? false : this.regexMap[config[option.regex]].test(inputValue))) {
                                return {basic: false, msg: config[option.validationMsg]}
                            }
                        }

                        //사용자 정의된 정규식으로 유효성 Check
                        if (angular.isDefined(config[option.regexType])) {
                            if (!(inputValue == null ? false : config[option.regexType].test(inputValue))) {
                                return {basic: false, msg: config[option.validationMsg]}
                            }
                        }

                        //다른 컬럼과 비교하여 유효성 Check
                        if (angular.isDefined(config[option.compareType])) {
                            var result;
                            var compareTo = parent[config[option.compareType]]

                            switch (config[option.compareType]) {
                                case compareType.EQUAL:
                                    result = inputValue === compareTo;
                                    break;
                                case compareType.NOT_EQUAL:
                                    result = inputValue !== compareTo;
                                    break;
                                case compareType.GREATER_THAN:
                                    result = inputValue > compareTo;
                                    break;
                                case compareType.GREATER_OR_EQUAL:
                                    result = inputValue >= compareTo;
                                    break;
                                case compareType.LESS_THAN:
                                    result = inputValue < compareTo;
                                    break;
                                case compareType.LESS_OR_EQUAL:
                                    result = inputValue <= compareTo;
                                    break;
                                case compareType.SIZE_GREATER_THAN:
                                    var size = getSize(inputValue);
                                    result = size != null && size > compareTo;
                                    break;
                                case compareType.SIZE_LESS_THAN:
                                    var size = getSize(inputValue);
                                    result = size != null && size < compareTo;
                                    break;
                                default :
                                    result = inputValue === compareTo;
                                    break
                            }
                            if (!result) {
                                return {basic: false, msg: config[option.validationMsg]}
                            }
                        }

                    }


                }
            }
        };

    }
})();