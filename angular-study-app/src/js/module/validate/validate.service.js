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
                            if (typeof values[i] === 'object') {
                                if (angular.isArray(values[i])) {
                                    var result = this.validationArray(arrValue[keyConfig][keys[i]], objInput[keys[i]]);
                                    if (result != null) {
                                        return keys[i] + '|' + result;
                                    }
                                }
                                else {
                                    var result = this.validationObj(arrValue[keyConfig][keys[i]], objInput[keys[i]]);
                                    if (result != null) {
                                        return keys[i] + '|' + result;
                                    }
                                }
                            }
                            else {
                                if (!this.patternCheck(values[i], objInput[keys[i]])) {
                                    return keys[i];
                                }
                            }
                        }
                        return null;
                    },

                    validationObj: function (arr, obj) {
                        var keys = Object.keys(arr);
                        var values = Object.values(arr);
                        for (var i = 0; i < keys.length; i++) {
                            if (typeof values[i] === 'object') {
                                if (angular.isArray(values[i])) {
                                    var result = this.validationArray(arr[keys[i]], obj[keys[i]]);
                                    if (result != null) {
                                        return keys[i] + '|' + result;
                                    }
                                }
                                else {
                                    var result = this.validationObj(arr[keys[i]], obj[keys[i]]);
                                    if (result === null) {
                                        return keys[i] + '|' + result;
                                    }
                                }
                            }
                            else {
                                if (!this.patternCheck(values[i], obj[keys[i]])) {
                                    return keys[i];
                                }
                            }
                        }
                    },

                    validationArray: function (arr, inputArr) {
                        for (var i = 0; i < inputArr.length; i++) {
                            if (angular.isArray(inputArr[i])) {
                                for (var j = 0; j < arr.length; j++) {
                                    this.validationArray(arr[j], inputArr[i]);
                                }
                            } else {
                                for (var j = 0; j < arr.length; j++) {
                                    return this.validationObj(arr[j], inputArr[i]);
                                }
                            }
                        }
                    },

                    patternCheck: function (pattern, value) {
                        switch (pattern) {
                            default:
                                return !(angular.isUndefined(value) || value === null || value === '');
                        }
                    }
                }
            }
        };
    }
})();

