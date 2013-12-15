require.config({
    baseUrl: '/app/',
    paths: {
        lodash: '/vendor/lodash/lodash',

        angular: '/vendor/angular/angular',
        angularResource: '/vendor/angular-resource/angular-resource',

        uiRouter: '/vendor/angular-ui-router/release/angular-ui-router',
        uiBootstrap: '/vendor/angular-bootstrap/ui-bootstrap',

        angularAMD: '/vendor/angularAMD/angularAMD',
        ngload: '/vendor/angularAMD/ngload',

        cookies: '/vendor/cookies-js/src/cookies',

        app: 'config'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        uiRouter: ['angular'],
        uiBootstrap: ['angular'],
        angularAMD: ['angular'],
        angularResource: ['angular']
    },
    deps: [ 'bootstrap' ]
});