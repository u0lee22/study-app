(function () {
    angular.module('study.app')
        .directive('userCreate', ['userService', function (userService) {
                return {
                    restrict: 'E',
                    replace: true,
                    template: '<div class="container">\n' +
                    '        <div class="row">\n' +
                    '            <div class="col-sm-1 p-sm">ID</div>\n' +
                    '            <div class="col-sm-3 p-sm"> <input class="form-control" type="text" ng-model="userItem.id"> </div>\n' +
                    '        </div>\n' +
                    '        <div class="row">\n' +
                    '            <div class="col-sm-1 p-sm"> 비밀번호</div>\n' +
                    '            <div class="col-sm-3 p-sm"> <input class="form-control" type="text" ng-model="userItem.pw"> </div>\n' +
                    '        </div>\n' +
                    '        <div class="row">\n' +
                    '            <div class="col-sm-1 p-sm"> 이름</div>\n' +
                    '            <div class="col-sm-3 p-sm"> <input class="form-control" type="text" ng-model="userItem.name"> </div>\n' +
                    '        </div>\n' +
                    '        <div class="row">\n' +
                    '            <div class="col-sm-1 p-sm">생년월일</div>\n' +
                    '            <div class="col-sm-3 p-sm">\n' +
                    '               <p class="input-group">\n' +
                    '                 <input type="text" class="form-control" uib-datepicker-popup="{{format}}" ng-model="userItem.date" is-open="popup1.opened" datepicker-options="dateOptions" ng-required="true" close-text="Close" alt-input-formats="altInputFormats" />\n' +
                    '                <span class="input-group-btn">\n' +
                    '                    <button type="button" class="btn btn-default" ng-click="open1()"> <i class="glyphicon-calendar glyphicon"></i> </button>\n' +
                    '                </span>\n' +
                    '               </p>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '        <div class="row">\n' +
                    '            <div class="col-sm-1 p-sm">E-Mail</div>\n' +
                    '            <div class="col-sm-2 p-sm">\n' +
                    '                <input type="text" class="form-control" ng-model="userItem.mailId">\n' +
                    '            </div>\n' +
                    '            <div class="col-sm-1 pb-sm pt">\n' +
                    '                <label>@</label>\n' +
                    '            </div>\n' +
                    '            <div class="col-sm-2 p-sm">\n' +
                    '                <input type="text" class="form-control" ng-model="userItem.mailAddress">\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '        <div class="row">\n' +
                    '            <div class="col-sm-1 p-sm">주소</div>\n' +
                    '            <div class="col-sm-8 p-sm"><input type="text" class="form-control" ng-model="userItem.address"> </div>\n' +
                    '        </div>\n' +
                    '        <div class="row">\n' +
                    '            <div class="col-sm-1 p-sm">전화번호</div>\n' +
                    '            <div class="col-sm-8 p-sm"> <input type="text" class="form-control" ng-model="userItem.number"> </div>\n' +
                    '        </div>\n' +
                    '        <div>\n' +
                    '            <button class="btn btn-primary" ng-click="createUser()">가입</button>\n' +
                    '            <button class="btn btn-secondary"  >취소</button>\n' +
                    '        </div>\n' +
                    '    </div>',
                    link: function (scope, element, attrs) {
                        scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                        scope.format = scope.formats[1];
                        scope.popup1 = {
                            opened: false
                        };
                        scope.altInputFormats = ['M!/d!/yyyy'];
                        scope.createUser = function () {
                            userService.create(scope.userItem).then
                            (function (res) {
                                alert(res);
                            });
                        }
                        scope.open1 = function () {
                            scope.popup1.opened = true;
                        }
                    }
                }

            }]
        );
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
                    '            <span>{{user.date}}</span>\n' +
                    '            <span>{{user.mailId}}</span>\n' +
                    '            <span>{{user.mailAddress}}</span>\n' +
                    '            <span>{{user.address}}</span>\n' +
                    '            <span>{{user.number}}</span>\n' +
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