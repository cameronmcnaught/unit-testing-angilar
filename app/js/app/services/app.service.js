(function () {
    'use strict';
    angular.module('app').factory('conversionService', function () {
        return {
            convertKelvinToCelsius: convertKelvinToCelsius
        }
    });

    function convertKelvinToCelsius(temp) {
        return Math.round(temp - 273);
    }
})();