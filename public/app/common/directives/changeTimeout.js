define([

    'app'

], function(app) {
    "use strict";

    app.directive('appChangeTimeout', function() {
        return {
            require: 'ngModel',
            link: function(scope, elem, attr, ctrl) {
                if (!attr.ngChange) {
                    throw new TypeError('ng-change directive not present');
                }

                angular.forEach(ctrl.$viewChangeListeners, function(listener, index) {
                    ctrl.$viewChangeListeners[index] = _.debounce(function() {
                        scope.$eval(attr.ngChange);
                    }, attr.appChangeTimeout || 0)
                });
            }
        }
    });
})