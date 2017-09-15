(function () {
    'use strict';

    angular.module('study.app')
        .config(config);

    config.$inject = ['$routeProvider', '$locationProvider', '$urlRouterProvider'];

    function config($routeProvider, $locationProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/app/home');
    }
})();