(function () {
    'use strict';

    angular
        .module('app')
        .filter('warmestDestinations', function () {
            return function (destinations, minTemp) {
                var warmDestinations = [];
                angular.forEach(destinations, function (destination) {
                    if (destination.weather && destination.weather.temp && destination.weather.temp >= minTemp) {
                        warmDestinations.push(destination);
                    }
                });
                return warmDestinations;
            };
        });


})();