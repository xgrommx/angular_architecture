define([

    'app',

    'common/services/resources/api'

], function(app, apiResource) {
    "use strict";

    app.register.factory('Video', function(apiResource) {
        return apiResource('video/:id', { id: '@id' });
    });
});