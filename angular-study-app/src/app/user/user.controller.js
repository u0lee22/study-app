(function () {

    angular.module('study.app')
        .controller('userListCtrl', userListCtrl);

    angular.module('study.app').value('users', []);
    angular.module('study.app').service('userService', userService);

    userListCtrl.$inject = ['$scope', 'userService'];
    userService.$inject = ['$q', 'users'];

    function userService($q, users) {
        this.create = function (user) {
            users.push(angular.copy(user));
            return $q(function (reslove) {
                reslove('회원가입완료 id : ' + user.id);
            });
        };
        this.get = function () {
            return $q(function (reslove) {
                reslove(users);
            })
        };
    }

    function userListCtrl($scope, userService) {
        $scope.test = "hihihi";
        $scope.userItem =
            {
                id: '',
                pw: '',
                name: '',
                year: '',
                month: '',
                day: '',
                mailId: '',
                mailAddress: '',
                address: '',
                number: ''
            };

        $scope.userList = [];

        $scope.createUser = function () {
            userService.create($scope.userItem).then
            (function (res) {
                alert(res);
            });

        };

        $scope.selectList = function () {
            userService.get().then(function (data) {
                $scope.userList = data;
            });
        };
    }
})
();