define([

    'app'


], function(app) {
    "use strict";

    app.register.directive('appVideoThumbnail', function() {
        return {
            restrict: 'E',
            scope: {
                video: '='
            },
            templateUrl: '/app/tv/components/videoThumbnail/template.html'
        };
    });
});