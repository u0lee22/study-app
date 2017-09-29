angular.module('study.app').service('userService', userService);

angular.module('study.app').value('users', []);
angular.module('study.app').value('careers', []);

userService.$inject = ['$q', 'users'];

function userService($q, users, careers) {
    this.create = function (user) {
        users.push(angular.copy(user));
        return $q(function (reslove) {
            reslove('회원가입완료 id : ' + user.id);
        });
    };

    this.addCareer = function (career) {

        careers.push(angular.copy(career))
        return $q(function (reslove) {
            reslove(careers)
        });
    }

    this.get = function () {
        return $q(function (reslove) {
            reslove(users)
            console.log(users);
        })
    };
}