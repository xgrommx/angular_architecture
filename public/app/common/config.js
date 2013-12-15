define([

    'app',

    'angularAMD',

    'common/services/cookiesStore',
    'common/services/currentCity',
    'common/services/routerDecorators/dynamicData'

], function(app, angularAMD, cookiesStore, currentCity, routerDecoratorDynamicData) {

    app.config(function($stateProvider, $cookiesStoreProvider, routerDecoratorDynamicDataProvider) {
        "use strict";

        routerDecoratorDynamicDataProvider.decorate($stateProvider);

        $stateProvider.state('body', {
            abstract: true,
            views: {
                body: {
                    templateUrl: '/app/common/views/body/template.html'
                },
                'currentCity@body': angularAMD.route({
                    controller: 'CommonBodyCurrentCity',
                    controllerUrl: 'common/views/body/currentCity/controller',
                    templateUrl: '/app/common/views/body/currentCity/template.html'
                })
            }

        });

        // Configure cookies
        $cookiesStoreProvider.setDefaultOptions({
            path: '/',
            domain: '.' + document.location.host.split('.').slice(-2).join('.').split(':')[0]
        });
    });

    app.run(function ($rootScope, $state, $stateParams, currentCity, routerDecoratorDynamicData) {
        "use strict";

        // Initialize current city before invoke controllers
        $rootScope.currentCity = currentCity;
        $rootScope.$on('$stateChangeStart', currentCity.$initialize);

        // Dynamic state data
        $rootScope.$on('$stateChangeSuccess', routerDecoratorDynamicData.listenStateChangeSuccess($stateParams))
        $rootScope.$on('$viewContentLoaded', _.bind(routerDecoratorDynamicData.listenViewContentLoaded, $state));
    });
});