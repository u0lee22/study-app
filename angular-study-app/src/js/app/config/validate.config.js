(function () {
    angular.module('study.app').config(validationConfig);

    validationConfig.$inject = ['validationProvider'];

    function validationConfig(validationProvider) {
        //TODO : validation service의 setValidation 함수호출 (key와 유효성 체크할 컬럼 오브젝트)
        {
            validationProvider
                .setConfigValidation('CAREER')
                .setConfigValidation('CAREER.company', {validationMsg: '회사명 유효성', nullMsg: '회사명', isNullCheck: true})
                .setConfigValidation('CAREER.position', {validationMsg: '회사 직책 유효성', nullMsg: '직책', isNullCheck: true})

            validationProvider
                .setConfigValidation('COMPANY')
                .setConfigValidation('COMPANY.name', {validationMsg: '이름 유효성', nullMsg: '이름', isNullCheck: true})
                .setConfigValidation('COMPANY.tel', {validationMsg: '전화번호 유효성', nullMsg: '전화번호', isNullCheck: true})
                .setConfigValidation('COMPANY.address', {validationMsg: '주소 유효성', nullMsg: '주소', isNullCheck: true})

            validationProvider
                .setConfigValidation('USER')
                    .setConfigValidation('USER.id', {validationMsg: '아이디 유효성', nullMsg: '아이디', regex: 'LOGIN_ID', isNullCheck: true})
                //     .setConfigValidation('USER.password', {validationMsg: '비밀번호 유효성', nullMsg: '비밀번호', regex: 'PASSWORD'})
                //     .setConfigValidation('USER.name', {nullMsg: 'NAME'})
                //     .setConfigValidation('USER.mail', {validationMsg: '이메일 유효성', nullMsg: 'EMAIL', regex: 'EMAIL'})
                //     .setConfigValidation('USER.address', {nullMsg: '주소'})
                //     .setConfigValidation('USER.mobile', {validationMsg: '핸드폰 유효성', nullMsg: 'PHONE', regex: 'MOBILE'})
                .setConfigValidation('USER.company', {type: 'object', genericType: 'COMPANY'})
                //.setConfigValidation('USER.career', {type: 'array', genericType: 'CAREER'})
        }
    }
})();

