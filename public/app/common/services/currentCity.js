define([

    'app',

    'common/models/city'

], function(app, City) {
    "use strict";

    app.factory('currentCity', function($cookiesStore, $state, $stateParams, City) {
        var currentCity = new City();

        currentCity.$initialize = function(event, toState, toParams, fromState, fromParams) {
            var city;

            if (toParams.city) {
                if (toParams.city !== currentCity.urlName) {
                    // TODO: Check before in cached id => urlName pairs
                    city = City.getByUrlName({ urlName: toParams.city });
                }
            } else if (!currentCity.id) {
                var cityId = $cookiesStore.get('city');

                if (cityId) {
                    city = City.get({ id: cityId });

                } else {
                    city = City.detect();
                }
            }

            if (city) {
                event.preventDefault();

                currentCity.$promise = city.$promise;

                city.$promise.then(function() {
                    angular.extend(currentCity, city);

                    $state.go(toState, toParams);
                });
            }
        };

        currentCity.$change = function(city) {
            if ($stateParams.city) {
                $stateParams.city = city.urlName;
            }

            $cookiesStore.put('city', city.id, {
                expires: 14 * 24 * 60 * 60 // 14 days
            });

            $state.go('.', $stateParams, { reload: true });
        };

        return currentCity;
    });
});