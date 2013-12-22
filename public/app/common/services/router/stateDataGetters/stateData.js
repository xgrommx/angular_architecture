define([

    'app'

], function(app) {
    "use strict";

    app.service('$stateData', function($state) {
        return $state.current.data;
    });
});