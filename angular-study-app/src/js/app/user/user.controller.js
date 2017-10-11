(function () {

    angular.module('study.app')
        .controller('userListCtrl', userListCtrl);

    userListCtrl.$inject = ['$scope', 'userService', 'validation'];

    function userListCtrl($scope, userService, validation) {
        $scope.status = {isFirstOpen: true};
        $scope.userItem = {
            mail: {id: '', address: ''},
            company: {name: '', tel: '', address: ''},
            career: [{company: '', position: ''}],
            aaa: ''
        };

        $scope.createUser = function () {
            //TODO : Validation get함수 호출(key, $scope.userItem)

            if (this.isEmptyObj($scope.userItem) > 0) {
                var result = validation.getValidation('USER', $scope.userItem);
                if (result == null) {
                    userService.create($scope.userItem).then
                    (function (res) {
                        alert(res);
                    });
                }
                else {
                    alert(result);
                }
            }
            else {
                alert('가입정보를 입력하세요.');
            }
        };


        $scope.isEmptyObj = function (obj) {
            var count = 0;
            for (var i in  obj) {
                if (typeof obj[i] === 'object') {
                    var result = this.isEmptyObj(obj[i]);
                    if (result > 0) {
                        count = +result;
                    }
                }
                else {
                    if (obj[i] != '' && obj[i].indexOf('object:')) {
                        console.log(obj[i]);
                        count++;
                    }
                }
            }
            return count;
        }

        $scope.addCareer = function (company, position) {
            $scope.userItem.career.push({company: company, position: position});
        };
    }
})
();