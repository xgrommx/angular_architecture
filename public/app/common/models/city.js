define([

    'app',

    'common/services/resources/api'

], function(app, apiResource) {
    "use strict";

    app.factory('City', function(apiResource) {
        return apiResource('cities/:id', { id: '@id' }, {
            getByUrlName: { url: 'cities/byUrlName', method: 'GET' },
            detect: { url: 'cities/detect', method: 'GET' }
        });
    });
});