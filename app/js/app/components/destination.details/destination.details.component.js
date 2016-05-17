(function () {
    'use strict';

    var details = {
        templateUrl: 'js/app/components/destination.details/destination.details.html',
        controller: destinationDetailsCtrl,
        bindings: {
            destination: '<',
            key: '<',
            onRemove: '&'
        }
    };

    destinationDetailsCtrl.$inject = ['$http', 'conversionService'];

    function destinationDetailsCtrl($http, conversionService) {
        var ctrl = this;

        ctrl.getWeather = function (destination) {
            $http
                .get('http://api.openweathermap.org/data/2.5/weather?q=' + destination.city + '&appid=' + ctrl.key)
                .then(
                    function success(response) {
                        if (response.data.weather) {
                            destination.weather = {};
                            destination.weather.main = response.data.weather[0].main;
                            destination.weather.temp = conversionService.convertKelvinToCelsius(response.data.main.temp);
                        } else {
                            // $scope.message = 'City not Found';
                        }
                    },
                    function error(error) {
                        // $scope.message = 'Server Error';
                    }
                )
        };
    }
    
    angular.module('app').component('destinationDetails', details);

})();