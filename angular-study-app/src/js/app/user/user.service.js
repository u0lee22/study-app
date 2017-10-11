angular.module('study.app').service('userService', userService);

angular.module('study.app').value('users', []);

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
            reslove(users)
        })
    };
}