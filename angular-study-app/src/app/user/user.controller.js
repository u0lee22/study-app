(function () {

    angular.module('study.app')
        .controller('userListCtrl', userListCtrl);

    userListCtrl.$inject = ['$scope', 'userService'];

    function userListCtrl($scope, userService) {
        $scope.user = {};
        $scope.userItem = {
            date : new Date()
        }
        $scope.format = 'yyyy/MM/dd'
        $scope.init = function () {
            userService.get().then(function (data) {
                $scope.userList = data;
            })
        }
        $scope.searching = function () {

        }
    }
})
();
