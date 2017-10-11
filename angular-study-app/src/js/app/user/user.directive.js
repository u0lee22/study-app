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
                    '            <span>{{user.id}}</span>\n' +
                    '            <span>{{user.pw}}</span>\n' +
                    '            <span ng-click="selectUser(user)">{{user.name}}</span>\n' +
                    '            <span>{{user.year}}</span>\n' +
                    '            <span>{{user.month}}</span>\n' +
                    '            <span>{{user.day}}</span>\n' +
                    '            <span>{{user.mail.id}}@{{user.mail.address}}</span>\n' +
                    '            <span>{{user.address}}</span>\n' +
                    '            <span>{{user.mobile}}</span>\n' +
                    '            <span>{{user.company.name}}</span>\n' +
                    '            <span>{{user.company.tel}}</span>\n' +
                    '            <span>{{user.company.address}}</span>\n' +
                    '            <span>{{user.career.company}}</span>\n' +
                    '            <span>{{user.career.position}}</span>\n' +
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