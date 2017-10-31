(function () {
    angular.module('study.app').config(validationConfig);

    validationConfig.$inject = ['validationProvider'];

    function validationConfig(validationProvider) {
        //TODO : validation service의 setValidation 함수호출 (key와 유효성 체크할 컬럼 오브젝트)
        {
            validationProvider
                .setValidation('CAREER')
                .setValidation('CAREER.company', {validationMsg: '유효성', msg: '회사명'})
                .setValidation('CAREER.position', {validationMsg: '유효성', msg: '직책'})

            validationProvider
                .setValidation('COMPANY')
                .setValidation('COMPANY.name', {validationMsg: '유효성', msg: '이름'})
                .setValidation('COMPANY.tel', {validationMsg: '유효성', msg: '전화번호'})
                .setValidation('COMPANY.address', {validationMsg: '유효성', msg: '주소'})

            validationProvider
                .setValidation('USER')
                .setValidation('USER.id', {validationMsg: '유효성', msg: '아이디', regex: 'LOGIN_ID'})
                .setValidation('USER.password', {validationMsg: '유효성', msg: '비밀번호', regex: 'PASSWORD'})
                .setValidation('USER.name', {msg: 'NAME'})
                .setValidation('USER.mobile', {validationMsg: 'SENTENCE_184', msg: 'PHONE', regex: 'MOBILE'})
                .setValidation('USER.email', {validationMsg: 'SENTENCE_183', msg: 'EMAIL', regex: 'EMAIL'})
                .setValidation('USER.career', {type: 'array', genericType: 'CAREER'})
                .setValidation('USER.company', {type: 'object',genericType: 'COMPANY'})
        }
    }
})();

