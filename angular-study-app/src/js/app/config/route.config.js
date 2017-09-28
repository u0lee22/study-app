(function () {
    'use strict';

    angular.module('study.app')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $locationProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(false);

        $urlRouterProvider.otherwise('/app/home');

        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'js/app/app.html'
            })
            .state('app.home', {
                url: '/home',
                templateUrl: 'js/app/home/home.html',
                controller: 'homeController'
            })
            .state('app.test', {
                url: '/test',
                templateUrl: 'js/app/home/test.html',
                controller: 'homeController'
            })
            .state('app.user', {
                url: '/user',
                abstract: true,
                template: '<div ui-view=""></div>'
            })
            .state('app.user.create', {
                url: '/create',
                templateUrl: 'js/app/user/create.html',
                controller: 'userListCtrl'
            })
            .state('app.user.list', {
                url: '/list',
                templateUrl: 'js/app/user/list.html',
                controller: 'userListCtrl'
            })
            .state('app.cal', {
                url: '/cal',
                templateUrl: 'js/app/calculator/cal.html',
                controller: 'calController'
            })
        ;
    }
})();