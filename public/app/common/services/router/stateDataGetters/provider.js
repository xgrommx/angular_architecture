define([

    'app',

    'angular'

], function(app, angular) {
    // TODO: Refactor this

    app.provider('routerStateDataGetters', function($stateProvider) {
        var dyn = [];


        var getDataHandler = function($injector, $stateParams) {
            return function() {
                dyn.forEach(function(conf) {
                    var stateDataGetters = conf.getters,
                        state = conf.state;

                    angular.forEach(stateDataGetters, function(getData, name) {

                        var locals = angular.extend({}, state.locals.globals);

                        // TODO: Remove this dirty hack. Why in globals $stateParmas empty? white hack with delete works in tv/config.js
                        locals.$stateParams = $stateParams;

                        var data = $injector.invoke(getData, null, locals);

                        if (state.data[name] && data.constructor && data.constructor === state.data[name].constructor) {
                            angular.forEach(state.data[name], function(value, propertyName) {
                                if (!data[propertyName]) {
                                    delete state.data[name][propertyName];
                                }
                            });

                            angular.extend(state.data[name], data);
                        } else {
                            state.data[name] = data;
                        }
                    });
                });
            };
        };

        var getScopeHandler = function($state) {
            return function(event) {
                dyn.forEach(function(conf) {
                    //TODO: Add data to parent scopes only
                    if ($state.includes(conf.state.self.name)) {
                        angular.extend(event.targetScope, conf.state.data);
                    }
                });
            }
        };

        return {
            decorateState: function() {
                $stateProvider.decorator('data', function(state, parent) {
                    var stateDataGetters = {};

                    //TODO: add/remove state from dyn when state on/off
                    angular.forEach(state.data, function(value, name) {
                        if (_.isFunction(value)) {
                            stateDataGetters[name] = value;
                            state.data[name] = null;
                        }
                    });

                    if (!_.isEmpty(stateDataGetters)) {
                        // TODO: Decorate
                        if (state.self.onEnter) {
                            throw 'onEnter is busy'
                        }
                        if (state.self.onExit) {
                            throw 'onExit is busy'
                        }

                        state.self.onEnter = function() {
//                            console.log(state.name, 'enter')
                        };

                        dyn.push({
                            state: state,
                            getters: stateDataGetters
                        });
                    }

                    if (state.parent && state.parent.data) {
                        if (!state.data) {
                            state.data = {};
                        }

                        // TODO: Object.create or polyfills if needed
                        state.data.__proto__ = state.parent.data;

                        state.self.data = state.data;
                    }

                    return state.data;
                });
            },
            $get: function() {
                return {
                    addGetDataOnRouteHandler: function($injector, $rootScope, $stateParams) {
                        "use strict";

                        $rootScope.$on('$stateChangeSuccess', getDataHandler($injector, $stateParams));
                    },
                    addDataToViewsScopesOnRouteHandler: function($rootScope, $state) {
                        "use strict";

                        $rootScope.$on('$viewContentLoaded', getScopeHandler($state));
                    }
                };
            }
        };
    });
})