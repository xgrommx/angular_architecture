define([

    'app'

], function(app) {
    "use strict";

    app.provider('routerIgnoreTrailingSlash', function($urlRouterProvider) {
        return {
            addRuleToUrlRouter: function() {
                $urlRouterProvider.rule(function($injector, $location) {
                    // TODO: Rewrite logic: no slash in the end

                    var path = $location.path()
                    // Note: misnomer. This returns a query object, not a search string
                        , search = $location.search()
                        , params
                        ;

                    // check to see if the path already ends in '/'
                    if (path[path.length - 1] === '/') {
                        return;
                    }

                    // If there was no search string / query params, return with a `/`
                    if (Object.keys(search).length === 0) {
                        return path + '/';
                    }

                    // Otherwise build the search string and return a `/?` prefix
                    params = [];
                    angular.forEach(search, function(v, k) {
                        params.push(k + '=' + v);
                    });
                    return path + '/?' + params.join('&');
                });
            },
            $get: {

            }
        }
    });
});