(function () {

    angular.module('study.app')
        .directive('userCreate', ['userService', 'validation', function (userService, validation) {
                return {
                    restrict: 'E',
                    replace: true,
                    template: '<div class="container">\n' +
                    '    <div class="row">\n' +
                    '        <div class="col-sm-1 p-sm">ID</div>\n' +
                    '        <div class="col-sm-3 p-sm"><input class="form-control" type="text" ng-model="userItem.id"></div>\n' +
                    '    </div>\n' +
                    '    <div class="row">\n' +
                    '        <div class="col-sm-1 p-sm"> 비밀번호</div>\n' +
                    '        <div class="col-sm-3 p-sm"><input class="form-control" type="text" ng-model="userItem.password"></div>\n' +
                    '    </div>\n' +
                    '    <div class="row">\n' +
                    '        <div class="col-sm-1 p-sm"> 이름</div>\n' +
                    '        <div class="col-sm-3 p-sm"><input class="form-control" type="text" ng-model="userItem.name"></div>\n' +
                    '    </div>\n' +
                    '    <div class="row">\n' +
                    '        <div class="col-sm-1 p-sm">생년월일</div>\n' +
                    '        <div class="col-sm-1 p-sm">\n' +
                    '            <input type="number" class="form-control" ng-model="userItem.year" min="1800" max="2017">\n' +
                    '        </div>\n' +
                    '        <div class="col-sm-1 pb-sm pt">\n' +
                    '            <label>년</label>\n' +
                    '        </div>\n' +
                    '        <div class="col-sm-1 pb-sm">\n' +
                    '            <input type="number" class="form-control" ng-model="userItem.month" min="01" max="12">\n' +
                    '        </div>\n' +
                    '        <div class="col-sm-1 pb-sm pt">\n' +
                    '            <label>월</label>\n' +
                    '        </div>\n' +
                    '        <div class="col-sm-1 p-sm">\n' +
                    '            <input type="number" class="form-control" ng-model="userItem.day" min="01" max="31">\n' +
                    '        </div>\n' +
                    '        <div class="col-sm-1 pb-sm pt">\n' +
                    '            <label>일</label></div>\n' +
                    '    </div>\n' +
                    '    <div class="row">\n' +
                    '        <div class="col-sm-1 p-sm">E-Mail</div>\n' +
                    '        <div class="col-sm-2 p-sm">\n' +
                    '            <input type="text" class="form-control" ng-model="userItem.mail.id">\n' +
                    '        </div>\n' +
                    '        <div class="col-sm-1 pb-sm pt">\n' +
                    '            <label>@</label>\n' +
                    '        </div>\n' +
                    '        <div class="col-sm-2 p-sm">\n' +
                    '            <input type="text" class="form-control" ng-model="userItem.mail.addr">\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '    <div class="row">\n' +
                    '        <div class="col-sm-1 p-sm">주소</div>\n' +
                    '        <div class="col-sm-8 p-sm"><input type="text" class="form-control" ng-model="userItem.address"></div>\n' +
                    '    </div>\n' +
                    '    <div class="row">\n' +
                    '        <div class="col-sm-1 p-sm">전화번호</div>\n' +
                    '        <div class="col-sm-8 p-sm"><input type="text" class="form-control" ng-model="userItem.mobile"></div>\n' +
                    '    </div>\n' +
                    '    <div class="row">\n' +
                    '        <div class="col-sm-1 p-sm">회사이름</div>\n' +
                    '        <div class="col-sm-3 p-sm"><input type="text" class="form-control" ng-model="userItem.address">\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '    <div class="row">\n' +
                    '        <div class="col-sm-1 p-sm">회사명</div>\n' +
                    '        <div class="col-sm-8 p-sm"><input type="text" class="form-control" ng-model="userItem.address">\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '    <div class="row">\n' +
                    '        <div class="col-sm-1 p-sm">경력사항</div>\n' +
                    '        <div class="col-sm-8 p-sm">\n' +
                    '            <uib-accordion close-others="oneAtATime">\n' +
                    '                <div uib-accordion-group class="panel-default" heading="경력사항" is-open="status.isFirstOpen"\n' +
                    '                     is-disabled="status.isFirstDisabled">\n' +
                    '                    <div class="row" ng-repeat="career in arrCareer">\n' +
                    '                        <div class="col-sm-1 p-sm">회사명</div>\n' +
                    '                        <div class="col-sm-3 p-sm"><label class="form-control">{{career.name}}</label>\n' +
                    '                        </div>\n' +
                    '                        <div class="col-sm-1 p-sm">직책</div>\n' +
                    '                        <div class="col-sm-3 p-sm"><label class="form-control">{{career.job}}</label>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                    <div class="row">\n' +
                    '                        <div class="col-sm-1 p-sm">회사명</div>\n' +
                    '                        <div class="col-sm-3 p-sm"><input type="text" class="form-control" ng-model="career.name">\n' +
                    '                        </div>\n' +
                    '                        <div class="col-sm-1 p-sm">직책</div>\n' +
                    '                        <div class="col-sm-3 p-sm"><input type="text" class="form-control" ng-model="career.job">\n' +
                    '                        </div>\n' +
                    '                        <div class="col-sm-1 p-sm">\n' +
                    '                            <button class="btn btn-primary" ng-click="addCareer()">추가</button>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            </uib-accordion>\n' +
                    '\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '    <div>\n' +
                    '        <button class="btn btn-primary" ng-click="createUser()">가입</button>\n' +
                    '        <button class="btn btn-secondary">취소</button>\n' +
                    '    </div>\n' +
                    '</div>',
                    link:

                        function ($scope, element, attrs) {
                            $scope.userItem = {};
                            $scope.career = {};
                            $scope.arrCareer = null;
                            $scope.createUser = function () {
                                //TODO : Validation get함수 호출(key, $scope.userItem)
                                var result = validation.getValidation('USER', $scope.userItem);

                                userService.create($scope.userItem).then
                                (function (res) {
                                    alert(res);
                                });
                            }
                            $scope.addCareer = function () {
                                console.log($scope.career);
                                userService.addCareer($scope.career);
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
                    '            <span>{{user.year}}</span>\n' +
                    '            <span>{{user.month}}</span>\n' +
                    '            <span>{{user.day}}</span>\n' +
                    '            <span>{{user.mail.id}}@{{user.mail.addr}}</span>\n' +
                    '            <span>{{user.address}}</span>\n' +
                    '            <span>{{user.mobile}}</span>\n' +
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