describe('Testing App Controller', function(){
    
    beforeEach(function(){module('app')});

    describe('Testing Main Controller', function () {

        var ctrl, scope, httpBackend, timeout;

        beforeEach(inject(function ($controller, $rootScope, $httpBackend, $timeout) {
            scope = $rootScope.$new();
            ctrl = $controller('MainController', {$scope: scope});
            httpBackend = $httpBackend;
            timeout = $timeout;
        }));

        afterEach(function () {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('Should initialize the title in the scope', function () {
            expect(scope.title).toBeDefined();
            expect(scope.title).toBe('Testing AngularJS Applications')
        });

        it('Should add 2 destinations to the destinations list', function () {
            expect(scope.destinations).toBeDefined();
            expect(scope.destinations.length).toBe(0);

            scope.newDestination = {
                city: 'London',
                country: 'England'
            };

            scope.addDestination();

            expect(scope.destinations.length).toBe(1);
            expect(scope.destinations[0].city).toBe('London');
            expect(scope.destinations[0].country).toBe('England');

            scope.newDestination = {
                city: 'Calgary',
                country: 'Canada'
            };

            scope.addDestination();

            expect(scope.destinations.length).toBe(2);
            expect(scope.destinations[1].city).toBe('Calgary');
            expect(scope.destinations[1].country).toBe('Canada');
            expect(scope.destinations[0].city).toBe('London');
            expect(scope.destinations[0].country).toBe('England');
        });

        it('Should remove a destination from the destinations list', function () {
            scope.destinations = [
                {
                    city: 'Paris',
                    country: 'France'
                },
                {
                    city: 'Warsaw',
                    country: 'Poland'
                }
            ];

            expect(scope.destinations.length).toBe(2);
            scope.removeDestination(0);
            expect(scope.destinations.length).toBe(1);
            expect(scope.destinations[0].city).toBe('Warsaw');
            expect(scope.destinations[0].country).toBe('Poland');
        });


        it('Should remove error message after a fixed period of time', function () {
            scope.message = 'Error';
            expect(scope.message).toBe('Error');

            scope.$apply();
            timeout.flush();

            expect(scope.message).toBe(null);
        });

    });
});