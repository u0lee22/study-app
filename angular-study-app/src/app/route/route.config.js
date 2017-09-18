(function () {
    'use strict';

    angular.module('study.app')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $locationProvider, $urlRouterProvider) {
        console.log('config');
        $locationProvider.html5Mode(false);

        $urlRouterProvider.otherwise('/app/home');

        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'app/app.html'
            })
            .state('app.home', {
                url: '/home',
                templateUrl: 'app/home/home.html',
                controller: 'homeController'
            })
            .state('app.test', {
                url: '/test',
                templateUrl: 'app/home/test.html',
                controller: 'homeController'
            })
        ;
    }
})();