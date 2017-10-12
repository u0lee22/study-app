(function () {

    // angular.module('study.app')
    //     .directive('userCreate', ['userService', 'validation', function (userService, validation) {
    //             return {
    //                 restrict: 'E',
    //                 link: function ($scope, element, attrs) {
    //
    //                 }
    //             }
    //
    //         }]
    //     );
    angular.module('study.app')
        .directive('userSelect', ['userService', function (userService) {
                return {
                    restrict: 'E',
                    replace: true,
                    scope: {
                        selectedUser: '='
                    },
                    template: '<div ng-init="selectList()">\n' +
                    '    <ul>\n' +
                    '        <li ng-repeat="user in userList">\n' +
                    '            <span>아이디 : {{user.id}}</span>\n' +
                    '            <span>비번 : {{user.pw}}</span>\n' +
                    '            <span>이름 : {{user.name}}</span>\n' +
                    '            <span>날짜 : {{user.year}}년</span>\n' +
                    '            <span>{{user.month}}월</span>\n' +
                    '            <span>{{user.day}}일</span>\n' +
                    '            <span>이메일 : {{user.mail.id}}@{{user.mail.address}}</span>\n' +
                    '            <span>주소 : {{user.address}}</span>\n' +
                    '            <span>연락처 : {{user.mobile}}</span>\n' +
                    '            <span>회사명 : {{user.company.name}}</span>\n' +
                    '            <span>회사번호 : {{user.company.tel}}</span>\n' +
                    '            <span>회사주소 : {{user.company.address}}</span>\n' +
                    '            <span ng-repeat="career in user.career" >경력 회사 : {{career.company}} 경력 직책 : {{career.position}}</span>\n' +
                    '        </li>\n' +
                    '    </ul>\n' +
                    '</div>',
                    link: function (scope, element, attrs) {

                        scope.userList = null;
                        scope.selectUser = function (user) {
                            scope.selectedUser = user;
                        };

                        function init() {
                            userService.get().then(function (data) {
                                scope.userList = data;
                            })
                        }

                        init();
                    }
                }

            }]
        );
})
();