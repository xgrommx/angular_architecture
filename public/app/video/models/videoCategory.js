define([

    'app',

    'common/services/resources/api'

], function (app, apiResource) {
    "use strict";

    app.register.factory('VideoCategory', function(apiResource) {
        return apiResource('video/categories');
    });
});