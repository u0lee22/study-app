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
                        var key = Object.keys(arrValue[keyConfig]);
                        var val = Object.values(arrValue[keyConfig]);

                        for (var i = 0; i < key.length; i++) {
                            if (typeof val[i] === 'object') {
                                var result = this.SymbolProcess(key[i], arrValue[keyConfig][key[i]], objInput[key[i]]);
                                if (result === false) {
                                    return false;
                                    break;
                                }
                            }
                            else {
                                var result = this.patternCheck(val[i], objInput[key[i]]);
                                if (!result) {
                                    alert(key[i] + '정보를 입력하세요.');
                                    return false;
                                    break;
                                }
                            }
                        }
                        return true;
                    },

                    SymbolProcess: function (parent, arr, obj) {
                        var key = Object.keys(arr);
                        var val = Object.values(arr);

                        for (var i = 0; i < key.length; i++) {
                            if (typeof val[i] === 'object') {
                                var result = this.SymbolProcess(parent + '-' + key[i], arr[key[i]], obj[key[i]]);
                                if (result === false) {
                                    return false;
                                    break;
                                }
                            }
                            else {
                                var result = this.patternCheck(val[i], obj[key[i]]);
                                if (!result) {
                                    alert('[' + parent + ']' + key[i] + '정보를 입력하세요.');
                                    return false;
                                    break;
                                }
                            }
                        }
                    },

                    patternCheck: function (pattern, value) {
                        switch (pattern) {
                            default:
                                return !(angular.isUndefined(value) || value == null || value === '');
                        }
                    }
                }
            }
        };
    }
})();
