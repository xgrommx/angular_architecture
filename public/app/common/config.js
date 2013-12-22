define([

    'app',

    'common/services/cookiesStore',
    'common/services/currentCity',

    'common/services/router/stateDataGetters/provider',
    'common/services/router/stateDataGetters/stateData',

    'common/services/router/shortViews',
    'common/services/router/ignoreTrailingSlash',

    'common/directives/changeTimeout',

    'common/directives/infinityList/infinity',

], function(app) {

    // Application config
    app.constant('config', {
        resources: {
            api: {
                host: 'http://api.geometria.ru',
                version: 1
            }
        }
    });

    // Configure router
    app.config(function($locationProvider, $urlRouterProvider, routerIgnoreTrailingSlashProvider, routerStateDataGettersProvider, routerShortViewsProvider) {
        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/spb/tv');

        //routerIgnoreTrailingSlashProvider.addRuleToUrlRouter();

        routerStateDataGettersProvider.decorateState();
        routerShortViewsProvider.decorateState();
    });

    // Configure states
    app.config(function($stateProvider) {
        $stateProvider.state('body', {
            abstract: true,
            views: {
                body: {
                    templateUrl: '/app/common/views/body/template.html'
                },
                'currentCity@body': 'common/body/currentCity'
            }
        });
    });

    // Configure cookies
    app.config(function($cookiesStoreProvider) {
        $cookiesStoreProvider.setDefaultOptions({
            path: '/',
            domain: '.' + document.location.host.split('.').slice(-2).join('.').split(':')[0]
        });
    })

    app.run(function($rootScope, $state, $stateParams, $injector, currentCity, routerStateDataGetters) {
        "use strict";

        // Initialize current city before invoke controllers
        currentCity.$addGetCityOnRouteHandler($rootScope);

        // State data from getters
        routerStateDataGetters.addGetDataOnRouteHandler($injector, $rootScope, $stateParams);
        routerStateDataGetters.addDataToViewsScopesOnRouteHandler($rootScope, $state);
    });
});