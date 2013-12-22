define([

    'app',

    'common/config' // TODO: Remove after update ui-router to 0.3

], function(app) {

    app.config(function($stateProvider) {

        $stateProvider.state('tv', {
            parent: 'body',
            abstract: true,
            resolve: {
                components: function($q) {
                    var deferred = $q.defer();

                    require(['tv/components/videoThumbnail/directive'], deferred.resolve);

                    return deferred.promise;

                },
                categories: function($q, $injector) {
                    var deferred = $q.defer();

                    require(['video/models/videoCategory'], function() {
                        var VideoCategory = $injector.get('VideoCategory');

                        VideoCategory.query().$promise.then(deferred.resolve);
                    });

                    return deferred.promise;
                }
            },
            data: {
                currentCategory: function($stateParams, categories, VideoCategory) {
                    var category = new VideoCategory();

                    if ($stateParams.category) {
                        angular.extend(category, _.find(categories, { urlName: $stateParams.category }));
                    }

                    return category;
                },
                currentSection: function($stateParams, $stateData) {
                    var section = {};

                    if ($stateParams.section && $stateData.currentCategory.tags) {
                        angular.extend(section, _.find($stateData.currentCategory.tags, { urlName: $stateParams.section }));
                    }

                    return section;
                },
                searchQuery: function($stateParams) {
                    var search = {};

                    if ($stateParams.search) {
                        search.str = $stateParams.search;
                    }

                    return search;
                }
            },
            views: {
                'main@body': {
                    templateUrl: '/app/tv/views/main/template.html'
                },
                'aside@tv': {
                    templateUrl: '/app/tv/views/main/aside/template.html'
                },
                'navigation@tv': 'tv/main/navigation'
            }
        });


        // TODO: Section must be optional param in tv.category state etc

        $stateProvider.state('tv.search', {
            url: '/:city/tv/search/:search',
            views: {
                list: 'tv/main/list/searchResults'
            }
        });

        $stateProvider.state('tv.categorySearch', {
            url: '/:city/tv/:category/search/:search',
            views: {
                list: 'tv/main/list/searchResults'
            }
        });

        $stateProvider.state('tv.sectionSearch', {
            url: '/:city/tv/:category/:section/search/:search',
            views: {
                list: 'tv/main/list/searchResults'
            }
        });


        $stateProvider.state('tv.index', {
            url: '/:city/tv',
            views : {
                list: 'tv/main/list/categories'
            }
        });

        $stateProvider.state('tv.category', {
            url: '/:city/tv/:category',
            views: {
                list: 'tv/main/list/list'
            }
        });

        $stateProvider.state('tv.section', {
            url: '/:city/tv/:category/:section',
            views : {
                list: 'tv/main/list/list'
            }
        });


    });
})