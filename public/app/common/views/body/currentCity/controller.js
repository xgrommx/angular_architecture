define([

    'app',

    'common/models/city'

], function(app, City) {
    "use strict";

    app.register.controller('CommonBodyCurrentCity', function($scope, currentCity, City) {
        $scope.cities = City.query({
            onlyGeo: true,
            sort: 'popularity desc'
        });

        $scope.change = function(city) {
            currentCity.$change(city);
        };
    });
});