define([

    'app'

], function(app) {
    "use strict";

    app.register.controller('TvMainNavigation', function($scope, categories) {
        $scope.categories = categories;
    });
});