define([

    'app',

    'video/models/video'

], function(app) {
    "use strict";

    app.register.controller('TvMainListList', function($scope, $stateData, $stateParams, Video, currentCity) {
        $scope.videos = Video.query({
            cityId: currentCity.id,
            categoryId: $stateData.currentCategory.id,
            tagId: $stateData.currentSection.id,
            search: $stateParams.search
        });
    });
});