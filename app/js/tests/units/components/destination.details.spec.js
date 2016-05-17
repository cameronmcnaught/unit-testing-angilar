describe('Testing App Components', function() {

    beforeEach(function(){module('app')});

    describe('Testing Destination Details Component', function () {

        beforeEach(module('templates'));

        // Mocking a dependency using $provide
        // Must happen before inject
        beforeEach(function() {
            module(function($provide) {
                var mockedConversionService = {
                    convertKelvinToCelsius: function(temp) {
                        return Math.round(temp - 273);
                    }
                };

                $provide.value('conversionService', mockedConversionService);
            });
        });

        var component, scope, destination, apiKey, $componentController, http;

        beforeEach(inject(function ($rootScope, _$componentController_, $httpBackend) {
            scope = $rootScope.$new();
            $componentController = _$componentController_;
            destination = {
                city: 'Calgary',
                country: 'Canada'
            };
            apiKey = 'xyz';
            http = $httpBackend;
        }));

        describe('Testing Destination Details Component - Controller', function(){

            it('Should update the weather for a specific destination', function () {

                component = $componentController('destinationDetails', null, {destination: destination, key: apiKey});

                http
                    .expectGET('http://api.openweathermap.org/data/2.5/weather?q=' + destination.city + '&appid=' + apiKey)
                    .respond({
                        weather: [{main: 'Rain', detail: 'Light rain'}],
                        main: {temp: 288}
                    });

                component.getWeather(component.destination);

                http.flush();

                expect(component.destination.weather.main).toBe('Rain');
                expect(component.destination.weather.temp).toBe(15);
            });

            it('Should call the parent controller remove function', function() {
                var remove = jasmine.createSpy('remove');
                component = $componentController('destinationDetails', null, {
                    destination: destination,
                    key: apiKey,
                    onRemove: remove
                });
                component.onRemove(destination);
                expect(remove).toHaveBeenCalledWith({
                    city: destination.city,
                    country: destination.country
                })
            });
        });

        describe('Testing Destination Details Component - DOM', function () {

            var template;

            beforeEach(inject(function($compile){
                var element = angular.element(
                    '<destination-details destination="destination" key="apiKey"></destination-details>'
                );
                template = $compile(element)(scope);
                scope.destination = {
                    city: 'Calgary',
                    country: 'Canada'
                };
                scope.apiKey = 'xyz';
                scope.$apply();
            }));

            it('Generate the correct HTML', function() {

                var templateHtml = template.find('span').eq(0);

                expect(templateHtml.text()).toContain('Calgary, Canada');

                scope.destination.city = 'Honolulu';
                scope.destination.country = 'USA';
                scope.$apply();

                expect(templateHtml.text()).toContain('Honolulu, USA');
            });

        });

    });
});