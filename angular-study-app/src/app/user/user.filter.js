(function () {
    angular.module('study.app')
        .filter('userFilter', function () {
            return function (list, search) {
                return list.filter(function (item) {
                    return item.id.match(search);
                })
            };

        })

})();