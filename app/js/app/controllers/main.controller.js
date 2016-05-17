(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainController', ['$rootScope', '$scope', '$http', '$timeout', function ($rootScope, $scope, $http, $timeout) {
            $scope.title = 'Testing AngularJS Applications';
            $scope.destinations = [];
            $scope.newDestination = {
                city: undefined,
                country: undefined
            };

            $scope.apiKey = '2f05cccfcd5aeb29c928dd3de19d3825';

            $scope.addDestination = function () {
                $scope.destinations.push({
                    city: $scope.newDestination.city,
                    country: $scope.newDestination.country
                })
            };

            $scope.removeDestination = function (index) {
                $scope.destinations.splice(index, 1);
            };

            $scope.messageWatcher = $scope.$watch('message', function () {
                if ($scope.message) {
                    $timeout(function () {
                        $scope.message = null;
                    }, 3000);
                }
            });

        }]);
})();