define([

    'app'

], function(app) {
    "use strict";

    app.controller('appInfinityController', function($scope) {
        var currentPage = 1,
            newPage = 1,
            oldPage = null;
    });

    //TODO: Restore scroll position https://github.com/angular-ui/ui-router/issues/10 or save position by url to service and listen popstate with defined state

    app.directive('appInfinity', function($document, $window) {
        return {
            controller: 'appInfinityController',
            link: function(scope, elem, attr, ctrl) {

                var scrollOffset = 200;

                function clientHeight() {
                    return $document[0].documentElement.clientHeight;
                }

                function scrollHeight() {
                    return Math.max($document[0].documentElement.scrollHeight, clientHeight());
                }

                function topScroll() {
                    return ($window.pageXOffset !== undefined) ? pageXOffset() : noPageXOffset();
                }

                function pageXOffset(horizontal) {
                    var scroll;

                    if (horizontal) {
                        scroll = pageXOffset;
                    } else {
                        scroll = pageYOffset;
                    }
                    return scroll;
                }
                function noPageXOffset(horizontal) {
                    var html = $document[0].documentElement;
                    var body = $document[0].body;
                    var scroll;

                    if (horizontal) {
                        scroll = html.scrollLeft || body && body.scrollLeft || 0;
                        scroll -= html.clientLeft;

                    } else {
                        scroll = html.scrollTop || body && body.scrollTop || 0;
                        scroll -= html.clientTop;
                    }
                    return scroll;
                }

                var loading = {
                    $resolved: true
                };

                function checkScroll() {

                    if (loading && loading.$resolved) {
                        _.throttle(function() {
                            if (clientHeight() + topScroll() > scrollHeight() - scrollOffset) {

                                loading = scope.$apply(attr.appInfinity);
                            }
                        }, 100)();
                    }
                }

                $document.bind('scroll', checkScroll);
            }
        }
    });
})