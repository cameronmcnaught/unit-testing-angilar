describe('Testing App Filter Specs', function(){

    beforeEach(function () {
        module('app');
    });

    describe('Testing App Filter', function () {

        it('Should return only warm destinations',
            inject(
                function ($filter) {
                    var warmest = $filter('warmestDestinations');

                    var destinations = [
                        {
                            city: 'Beijing',
                            country: 'China',
                            weather: {
                                temp: 21
                            }
                        },
                        {
                            city: 'Moscow',
                            country: 'Russia'
                        },
                        {
                            city: 'Mexico City',
                            country: 'Mexico',
                            weather: {
                                temp: 12
                            }
                        },
                        {
                            city: 'Lima',
                            country: 'Peru',
                            weather: {
                                temp: 15
                            }
                        }
                    ];

                    expect(destinations.length).toBe(4);

                    var warmDests = warmest(destinations, 15);

                    expect(warmDests.length).toBe(2);
                    expect(warmDests[0].city).toBe('Beijing');
                    expect(warmDests[1].city).toBe('Lima');
                }
            )
        );
    });
});