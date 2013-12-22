define([

    'app',

    'angular',
    'angularAMD'

], function(app, angular, angularAMD) {
    "use strict";

    app.provider('routerShortViews', function($stateProvider) {
        return {
            decorateState: function() {
                $stateProvider.decorator('views', function(state, parent) {
                    var result = {}, views = parent(state);

                    angular.forEach(views, function(config, name) {
                        if (_.isString(config)) {
                            var viewPathParts = config.split('/');
                            config = {};

                            // Controller
                            config.controller = viewPathParts.map(function(part) {
                                return part.charAt(0).toUpperCase() + part.slice(1);
                            }).join('');

                            viewPathParts.splice(1, 0, 'views');
                            var viewPath = viewPathParts.join('/');

                            // Template URL
                            config.templateUrl = '/app/' + viewPath + '/template.html';

                            // Controller URL
                            config.controllerUrl = viewPath + '/controller';
                        }

                        result[name] = angularAMD.route(config);
                    });

                    return result;
                });
            },
            $get: {

            }
        }
    });
});