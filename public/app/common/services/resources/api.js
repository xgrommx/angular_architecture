define([

    'app',

    'angular'

], function(app, angular) {
    "use strict";

    app.factory('apiResource', function($resource, $q, $http, config) {

        var DEFAULT_ACTIONS = {
            get:    { method: 'GET' },
            save:   { method: 'POST' },
            query:  { method: 'GET', isArray:true },
            remove: { method: 'DELETE' },
            delete: { method: 'DELETE'}
        };

        var transformResponse = $http.defaults.transformResponse.concat([function(response) {
            response = response.data || response;

            if (response.meta && response.meta.totalCount) {
                response.$totalCount = response.meta.totalCount;
            }

            return response;
        }]);

        return function(url, paramDefaults, actions) {
            // Append host and version to url
            url = addUrlPrefix(url);

            // Add response transformation for all actions
            actions = angular.extend({}, DEFAULT_ACTIONS, actions);
            angular.forEach(actions, function(settings) {
                if (!settings.transformResponse) {
                    settings.transformResponse = transformResponse;
                }
                if (settings.url) {
                    settings.url = addUrlPrefix(settings.url);
                }
            });

            // Add _meta param for new response version
            paramDefaults = paramDefaults || {};
            paramDefaults._meta = 1;

            return $resource(url, paramDefaults, actions);
        }

        function addUrlPrefix(url) {
            return config.resources.api.host + '/v' + config.resources.api.version + '/' + url;
        }
    });
});
