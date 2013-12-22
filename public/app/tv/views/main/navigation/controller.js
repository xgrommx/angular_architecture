define([

    'app'

], function(app) {
    "use strict";

    app.register.controller('TvMainNavigation', function($scope, $state, $stateParams, $stateData, categories) {
        $scope.categories = categories;

        $scope.search = function(searchQueryStr) {

            if (searchQueryStr) {
                var stateName = 'tv.search',
                    params = angular.extend({}, $state.params, {
                        search: searchQueryStr
                    });

                if ($state.params.section) {
                    stateName = 'tv.sectionSearch';

                } else if ($state.params.category) {
                    stateName = 'tv.categorySearch';
                }
                $state.go(stateName, params);
            }
        }
    });
});