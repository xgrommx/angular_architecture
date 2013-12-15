define([

    'app',

    'angular'

], function (app, angular) {
    // TODO: Refactor this

    // TODO: $state.current.data.category.id is shit. Needs $stateData service

    app.provider('routerDecoratorDynamicData', function ($injector) {
        var dyn = [];

        var decorate = function ($stateProvider) {
            $stateProvider.decorator('data', function (state, parent) {
                var stateDataGetters = {};

                //TODO: add/remove state from dyn when state on/off
                angular.forEach(state.data, function (value, name) {
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

                    state.self.onEnter = function () {
                        console.log(state.name, 'enter')
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
        };

        var listenStateChangeSuccess = function ($stateParams) { // TODO: Remove this dirty hack. Why in globals $stateParmas empty? white hack with delete works in tv/config.js

            return function () {
                dyn.forEach(function (conf) {
                    var stateDataGetters = conf.getters,
                        state = conf.state;

                    conf.data = {};

                    angular.forEach(stateDataGetters, function (getData, name) {

                        var locals = angular.extend({}, state.locals.globals);

//                        delete locals.$stateParams;
                        locals.$stateParams = $stateParams

                        var data = $injector.invoke(getData, null, locals);

                        // TODO: Wrong data warning in conf cache
                        conf.data[name] = state.data[name] = data;
                    });
                });
            }

        };

// TODO: Use it wnen name will be available
//        var listenViewContentLoaded = function (event, name) {
//            dyn.forEach(function (conf) {
//                var state = conf.state;
//
//                if (state.locals[name]) {
//                    angular.extend(event.targetScope, state.data);
//                }
//            });
//        };

        var listenViewContentLoaded = function(event) {
            var $state = this;

            return function() {
                dyn.forEach(function(conf) {
                    var state = conf.state;

                    if ($state.includes(state.self.name)) {
                        angular.extend(event.targetScope, state.data);
                    }
                });
            }
        };

        return {
            decorate: decorate,
            $get: function () {
                return {
                    listenStateChangeSuccess: listenStateChangeSuccess,
                    listenViewContentLoaded: listenViewContentLoaded
                };
            }
        };
    });
})