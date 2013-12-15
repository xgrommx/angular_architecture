define([

    'app',

    'angular',

    'cookies'

], function(app, angular, Cookies) {
    app.provider('$cookiesStore', function() {
        var self = this;

        self.defaultOptions = {};

        self.setDefaultOptions = function(options){
            self.defaultOptions = options;
        };

        self.$get = function() {
            return {
                get: function(name){
                    var jsonCookie = Cookies.get(name);

                    if (jsonCookie) {
                        return angular.fromJson(jsonCookie);
                    }
                },

                put: function(nname, value, options) {
                    options = angular.extend({}, self.defaultOptions, options);

                    Cookies.set(name, angular.toJson(value), options)
                },

                remove: function(name, options) {
                    options = angular.extend({}, self.defaultOptions, options);

                    Cookies.expire(name, options);
                }
            };
        };
    });
});