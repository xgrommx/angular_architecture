define([

    'app',

    'video/models/video'

], function(app) {
    "use strict";

    app.register.controller('TvMainListCategories', function($scope, Video, currentCity, categories) {

        var fieldsWithoutCategory = 'id,title,date,file(cover),photoReport(place(title,url))';
        var fieldsWithCategory = fieldsWithoutCategory + ',category';

        $scope.selections = [
            {
                title: 'new_videos',
                videos: Video.query({
                    cityId: currentCity.id,
                    _fields: fieldsWithCategory
                })
            },
            {
                title: 'popular_videos',
                videos: Video.query({
                    sort: 'popularity desc',
                    cityId: currentCity.id,
                    _fields: fieldsWithCategory
                })
            },
            {
                title: 'albums_videos',
                videos: Video.query({
                    sort: 'date desc',
                    tagId: 1,
                    cityId: currentCity.id,
                    _fields: fieldsWithCategory
                })
            }
        ].concat(_.map([3, 1, 6, 2, 5, 4], _getOptionsByCategoryId, this));

        function _getOptionsByCategoryId(categoryId) {

            var category = _.find(categories, {id: categoryId});
            return {
                title: category.name,
                videos: Video.query({
                    categoryId: categoryId,
                    cityId: currentCity.id,
                    _fields: fieldsWithoutCategory
                })
            };
        }
    });
});