(function () {

    angular.module('study.app')
        .controller('userListCtrl', userListCtrl);

    userListCtrl.$inject = ['$scope', 'userService', 'validation'];

    function userListCtrl($scope, userService, validation) {
        $scope.status = {isFirstOpen: true};
        $scope.userItem = {
            company: {name: '', tel: '', address: ''},
            career: [{company: '', position: ''}],
        };

        $scope.createUser = function () {
            //TODO : Validation get함수 호출(key, $scope.userItem)
            if (this.isEmptyObj($scope.userItem) > 0) {
                var result = validation.getResultValidation('USER', $scope.userItem);
                console.log(result)

                if (result == null) {
                    userService.create($scope.userItem).then
                    (function (res) {
                        alert(res);
                    });
                }
                else {
                    alert(result.msg + '정보를 입력하세요.');
                }
            }
            else {
                alert('가입정보를 입력하세요.');
            }
        };

        $scope.isEmptyObj = function (obj) {
            var count = 0;
            var values = Object.values(obj);
            for (var i = 0; i < values.length; i++) {
                if (typeof values[i] === 'object' || angular.isArray(values[i])) {
                    var result = this.isEmptyObj(values[i]);
                    if (result > 0) {
                        count = +result;
                    }
                }
                else {
                    if (values[i] != '' && (!values[i].includes('object:'))) {
                        count++;
                        if (count > 0)
                            return count;
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