require.config({
    baseUrl: '/app/',
    paths: {
        lodash: '/vendor/lodash/lodash',

        angular: '/vendor/angular/angular',
        angularRu: '/vendor/angular-i18n/angular-locale_ru',
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
        angularRu: ['angular'],
        uiRouter: ['angular'],
        uiBootstrap: ['angular'],
        angularAMD: ['angular'],
        angularResource: ['angular']
    },
    deps: [ 'bootstrap' ]
});