(function () {
    angular.module('study.app').config(validationConfig);

    validationConfig.$inject = ['validationProvider'];

    function validationConfig(validationProvider) {
        //TODO : validation service의 setValidation 함수호출 (key와 유효성 체크할 컬럼 오브젝트)
        {
            validationProvider.setValidation('USER', {
                id: {key: 'id', check: 'ID'},
                password: {key: 'password', check: 'PASSWORD'},
                name: {key: 'name'},
                year: {key: 'year', check: 'NUMBER'},
                month: {key: 'month', check: 'NUMBER'},
                day: {key: 'day', check: 'NUMBER'},
                mail: {key: 'mail', check: 'EMAIL'},
                address: {key: 'address'},
                mobile: {key: 'mobile', check: 'TEL'},
                company: {name: {key: 'name'}, tel: {key: 'tel', check: 'TEL'}, address: {key: 'address'}},
                career: [{company: {key: 'company'}, position: {key: 'position'}}]
            });

            /*validationProvider.setValidation('CAMPAIGN', {
                subscriber: {key: 'SUBSCRIBER'},
                brand: {key: 'BRAND'},
                type: {key: 'CAMPAIGN_TYPE'},
                title: {key: 'CAMPAIGN_NAME'},
                taxInvoiceIssueMonth: {key: 'TAX_INVOICES_ISSUE_MONTH'},
                adGroups: {
                    ads: {
                        product: [{key: 'ADVERTISEMENT'}, {key: 'PRODUCT'}],
                        startAt: {key: 'ADVERTISEMENT_PERIOD'},
                        endAt: {key: 'ADVERTISEMENT_PERIOD'},
                        amount: [{key: 'ADVERTISEMENT'}, {key: 'SUBSCRIPTION_AMOUNT'}],
                        targetImpressionCnt: [{key: 'ADVERTISEMENT'}, {key: 'GUARANTEE_IMPRESSION_COUNT'}],
                        title: {key: 'ADVERTISEMENT_NAME'}
                    }
                }
            });

            validationProvider.setValidation('ASSET', {
                advertiserUser: {key: 'advertiserUser', inValid: 'SENTENCE_36'},
                serviceMedia: {key: 'serviceMedia', inValid: 'SENTENCE_212'},
                title: {key: 'title', inValid: 'SENTENCE_131'},
                uploaded: {key: 'uploaded', inValid: 'SENTENCE_51'/!*, ValidationService.patterns.NOT_EQUAL, false*!/}
            });


            validationProvider.setValidation('CONTRACT', {
                    subscriber: {key: 'subscriber', inValid: 'SUBSCRIPTION_ACCOUNT'},
                    advertiser: {key: 'advertiser', inValid: 'ADVERTISER'},
                    startAt: {key: 'startAt', inValid: 'CONTRACT_PERIOD'},
                    endAt: {key: 'endAt', inValid: 'CONTRACT_PERIOD'},
                    name: {key: 'name', inValid: 'CONTRACT_DETAIL_NAME'},
                    amount: {key: 'amount', inValid: 'CONTRACT_AMOUNT'}
                }
            );

            validationProvider.setValidation('CONTRACT', {
                    subscriber: {key: 'subscriber', inValid: 'SUBSCRIPTION_ACCOUNT'},
                    advertiser: {key: 'advertiser', inValid: 'ADVERTISER'},
                    startAt: {key: 'startAt', inValid: 'CONTRACT_PERIOD'},
                    endAt: {key: 'endAt', inValid: 'CONTRACT_PERIOD'},
                    name: {key: 'name', inValid: 'CONTRACT_DETAIL_NAME'},
                    amount: {key: 'amount', inValid: 'CONTRACT_AMOUNT'}
                }
            );


            validationProvider.setValidation('PRODUCT', {
                displayStartAt: {key: 'displayStartAt', inValid: 'PERIOD'},
                displayEndAt: {key: 'displayEndAt', inValid: 'PERIOD'},
                skipTimeInSec: [$scope.productEditObj.media].media.name === 'oksusu' ?
                    {
                        key: 'skipTimeInSec',
                        inValid: 'SKIP_SECONDS',
                        pattern: ValidationService.patterns.GREATER_THAN,
                        compareTo: 0
                    } :
                    {
                        key: 'limitTimeInSec',
                        inValid: 'ASSET_LENGTH_SHORT',
                        pattern: ValidationService.patterns.GREATER_THAN,
                        compareTo: 0
                    }
            });*/
        }
    }
})();
