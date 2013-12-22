define([

    'app',

    'video/models/video'

], function(app) {
    "use strict";

    app.register.controller('TvMainListSearchResults', function($scope, $stateData, $stateParams, Video, currentCity) {

        var videoLimit = 20;

        var allVideos = [];
        var allVideosPagesCounter = 0;

        $scope.allVideos = allVideos;
        $scope.loadingAllVideos = false;

        loadMoreAll();

        function loadMoreAll() {
            if (!allVideos.$meta || allVideos.length < allVideos.$meta.totalCount) {

                $scope.loadingAllVideos = true;

                var newVideos = Video.query({
                    cityId: currentCity.id,
                    search: $stateData.searchQuery.str,
                    offset: allVideosPagesCounter * videoLimit
                });

                allVideosPagesCounter++;

                newVideos.$promise.then(function() {
                    allVideos.push.apply(allVideos, newVideos);
                    allVideos.$meta = newVideos.$meta;
                    allVideos.$promise = newVideos.$promise;
                    allVideos.$resolved = newVideos.$resolved;
                    $scope.loadingAllVideos = false;
                })

                return newVideos;
            }
        }
        $scope.loadMoreAll = loadMoreAll;
    });
});