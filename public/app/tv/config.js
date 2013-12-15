define([

    'app',

    'angular',
    'angularAMD',

    'common/config' // TODO: Remove after update ui-router to 0.3

], function(app, angular, angularAMD) {

    app.config(function($stateProvider) {

        $stateProvider.state('tv', {
            parent: 'body',
            abstract: true,
            resolve: {
                categories: function($q, $injector) {
                    var deferred = $q.defer();

                    require(['video/models/videoCategory'], function() {

                        var VideoCategory = $injector.get('VideoCategory');

                        VideoCategory.query().$promise.then(function(categories) {
                            deferred.resolve(categories);
                        });
                    });
                    return deferred.promise;
                }
            },
            data: {
                category: function($stateParams, categories) {
                    var category = null;

                    if ($stateParams.category) {
                        category = _.find(categories, { urlName: $stateParams.category });
                    }

                    return category;
                }
            },
            views: {
                main: {
                    templateUrl: '/app/tv/views/main/template.html'
                },
                'navigation@tv': angularAMD.route({
                    controller: 'TvMainNavigation',
                    controllerUrl: 'tv/views/main/navigation/controller',
                    templateUrl: '/app/tv/views/main/navigation/template.html'
                }),
                'aside@tv': angularAMD.route({
                    templateUrl: '/app/tv/views/main/aside/template.html'
                })
            }
        });

        $stateProvider.state('tv.index', {
            url: '/:city/tv',
            views: {
                list: angularAMD.route({
                    controller: 'TvMainCategories', // TODO: Method which fill this three properties from module name and views path
                    controllerUrl: 'tv/views/main/categories/controller',
                    templateUrl: '/app/tv/views/main/categories/template.html'
                })
            }
        });

        $stateProvider.state('tv.category', {
            url: '/:city/tv/:category',
            views: {
                list: angularAMD.route({
                    controller: 'TvMainList',
                    controllerUrl: 'tv/views/main/list/controller',
                    templateUrl: '/app/tv/views/main/list/template.html',
                })
            }
        });
    });
})