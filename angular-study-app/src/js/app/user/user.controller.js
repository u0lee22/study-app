(function () {

    angular.module('study.app')
        .controller('userListCtrl', userListCtrl);

    userListCtrl.$inject = ['$scope'];

    function userListCtrl($scope) {
        $scope.user = {};
        $scope.status = {
            isFirstOpen: true
        };
    }
})
();