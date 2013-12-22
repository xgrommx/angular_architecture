define([

    'angular',
    'lodash',

    'angularResource',
    'uiRouter',
    'uiBootstrap'

], function(angular) {
    return angular.module('app', [ 'ui.router', 'ui.bootstrap', 'ngResource' ]);
});