define([

    'app',

    'video/models/video'

], function(app) {
    "use strict";

    app.register.controller('TvMainCategories', function($scope, Video, currentCity, categories) {

        var fieldsWithoutCategory = 'id,title,date,file(cover),photoReport(place(title,url))';
        var fieldsWithCategory = fieldsWithoutCategory + ',category';

        $scope.selections = [
            {
                title: 'new_videos',
                seeAllUrl: 'video/new',
                //title: locale.get('new_videos'),
                //seeAllUrl: this._getFullUrl('new'),
                showCategory: true,
                rows: 2,
                videos: Video.query({
                    cityId: currentCity.id,
                    _fields: fieldsWithCategory
                })
            },
            {
                title: 'popular_videos',
                seeAllUrl: 'video/popular_videos',
                //title: locale.get('popular_videos'),
                //seeAllUrl: this._getFullUrl('popular'),
                showCategory: true,
                videos: Video.query({
                    sort: 'popularity desc',
                    cityId: currentCity.id,
                    _fields: fieldsWithCategory
                })
            },
            {
                title: 'albums_videos',
                seeAllUrl: 'video/albums_videos',
                //title: locale.get('albums_videos'),
                //seeAllUrl: this._getFullUrl('tag/reports'),
                showCategory: true,
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
                seeAllUrl: 'video/smth',
                //seeAllUrl: this._getFullUrl(category.urlName)),
                seeAllCount: true,
                videos: Video.query({
                    categoryId: categoryId,
                    cityId: currentCity.id,
                    _fields: fieldsWithoutCategory
                })
            };
        }
    });
});