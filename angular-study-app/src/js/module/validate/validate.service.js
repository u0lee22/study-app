(function () {
    angular.module('validation')
        .provider('validation', validationProvider);

    function validationProvider() {
        return {
            setValidation: function (obj) {
                //TODO : config에서 설정된 check항목 setting
                {
                //     loginId: 'adf',
                //     pw: 'sadfsadf',
                //     name: 'sdf',
                //     company: {
                //     name: '구글',
                //     tel: '000',
                //     address: 'ㅁㄴ'
                //     },
                //     careers : [
                //         {
                //             company: '다음',
                //             position: '사원'
                //         },{
                //             company: '네이버',
                //             position: '사원'
                //         }
                //     ]
                }
            },

            $get: function () {
                return {
                    getValidation: function (key, objInput) {
                        //TODO : key에 해당하는 설정 object를 입력받은 object와 비교 후 유효성 체크 결과 return
                        for (var i in objInput) {
                            console.log(objInput[i] + ' : ' + typeof(objInput[i]));
                        }
                    }
                }
            }
        };
    }
})();