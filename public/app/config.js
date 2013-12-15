define([

    'angular',
    'angularAMD',

    'angularResource',

    'uiRouter',
    'uiBootstrap',

    'lodash'

], function(angular, angularAMD) {
    var app = angular.module('app', [ 'ui.router', 'ui.bootstrap', 'ngResource' ]);

    // Configure routing
    app.config(function($locationProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/spb/tv');
    });

    // Application config
    app.constant('config', {
        resources: {
            api: {
                host: 'http://api.geometria.ru',
                version: 1
            }
        }
    });

    return app;
});