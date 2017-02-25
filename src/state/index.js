let gradientImage =  require('../images/gradient.png');
export default {
    amenitiesTypes: [
        { id: 1, name: 'Popular amenities' },
        { id: 2, name: 'Apartment' },
        { id: 3, name: 'Kitchen' }
    ],
    amenities: [
        { id: 1, type: 1, name: 'Air conditioner' },
        { id: 2, type: 1, name: 'Free transportation' },
        { id: 3, type: 1, name: 'Hair dryer' },
        { id: 4, type: 1, name: 'Wireless internet'},
        { id: 5, type: 1, name: 'Computer'},
        { id: 6, type: 1, name: 'Free wireless internet'},
        { id: 7, type: 1, name: 'Elevator'},
        { id: 8, type: 1, name: 'Guarded parking'},
        { id: 9, type: 1, name: 'Vacuum cleaner'},
        { id: 10, type: 1, name: 'TV (local channels only)'},
        { id: 11, type: 2, name: 'Balcony'},
        { id: 12, type: 2, name: 'Game room'},
        { id: 13, type: 2, name: 'Fireplace'},
        { id: 14, type: 2, name: 'Terrace'},
        { id: 15, type: 2, name: 'Garden'},
        { id: 16, type: 2, name: 'Floor heating'},
        { id: 17, type: 3, name: 'Blender'},
        { id: 18, type: 3, name: 'Dishwasher'},
        { id: 19, type: 3, name: 'Coffee maker'},
        { id: 20, type: 3, name: 'Freezer'},
        { id: 21, type: 3, name: 'Cooking hob'},
        { id: 22, type: 3, name: 'Fridge'},
        { id: 23, type: 3, name: 'Golden blender'},
        { id: 24, type: 3, name: 'Silver dishwasher'},
        { id: 25, type: 3, name: 'Bronze coffee maker'},
        { id: 26, type: 3, name: 'Mega freezer'},
        { id: 27, type: 3, name: 'Strait cooking hob'},
        { id: 28, type: 3, name: 'Little bit gay fridge'}
    ],
    accommodations: [
        {
            id: 1,
            name: 'Stylish apartment in el born',
            price: 85,
            coordinates: [41.393592, 2.162570],
            amenities: [7, 10, 16, 18],
            image: require('../images/flat1.png'),
            gradient: gradientImage
        },
        {
            id: 2,
            name: 'A cozy flat near Las Ramblas',
            price: 70,
            coordinates: [41.394195, 2.164844],
            amenities: [6, 12],
            image: require('../images/flat2.png'),
            gradient: gradientImage
        },
        {
            id: 3,
            name: 'Apartment in the classic Barcelona center',
            price: 60,
            coordinates: [41.393732, 2.165551],
            amenities: [1, 7, 13, 15, 20],
            image: require('../images/flat3.png'),
            gradient: gradientImage
        },
        {
            id: 4,
            name: 'Classic Eixample place for rent',
            price: 75,
            coordinates: [41.392794, 2.164888],
            amenities: [2, 7, 11],
            image: require('../images/flat4.png'),
            gradient: gradientImage
        },
        {
            id: 5,
            name: 'Atlantida Beach',
            price: 90,
            coordinates: [41.392876, 2.163260],
            amenities: [19],
            image: require('../images/flat1.png'),
            gradient: gradientImage
        },
        {
            id: 6,
            name: 'Elegant place in Eixample',
            price: 150,
            coordinates: [41.394479, 2.163797],
            amenities: [1, 5, 6, 11, 13, 20],
            image: require('../images/flat2.png'),
            gradient: gradientImage
        },
    ],
    amenitiesFilter: [],
    filteredAccommodations: [],
    resultType: 2,
    collapseType: 2
}




