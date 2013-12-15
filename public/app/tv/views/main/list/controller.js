define([

    'app',

    'video/models/video'

], function(app, VideoCategory, Video) {
    "use strict";

    app.register.controller('TvMainList', function($scope, $state, Video, currentCity) {
        $scope.videos = Video.query({
            cityId: currentCity.id,
            categoryId: $state.current.data.category.id
        });
    });
});