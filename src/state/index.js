export default {
    amenitiesTypes: [
        { id: 1, name: 'popular amenities' },
        { id: 2, name: 'apartment' },
        { id: 3, name: 'kitchen' }
    ],
    amenities: [
        { id: 1, type: 1, name: 'air conditioner' },
        { id: 2, type: 1, name: 'free transportation' },
        { id: 3, type: 1, name: 'hair dryer' },
        { id: 4, type: 1, name: 'wireless internet'},
        { id: 5, type: 1, name: 'computer'},
        { id: 6, type: 1, name: 'free wireless internet'},
        { id: 7, type: 1, name: 'elevator'},
        { id: 8, type: 1, name: 'guarded parking'},
        { id: 9, type: 1, name: 'vacuum cleaner'},
        { id: 10, type: 1, name: 'TV (local channels only)'},
        { id: 11, type: 2, name: 'balcony'},
        { id: 12, type: 2, name: 'game room'},
        { id: 13, type: 2, name: 'fireplace'},
        { id: 14, type: 2, name: 'terrace'},
        { id: 15, type: 2, name: 'floor heating'},
        { id: 16, type: 3, name: 'blender'},
        { id: 17, type: 3, name: 'dishwasher'},
        { id: 18, type: 3, name: 'coffee maker'},
        { id: 19, type: 3, name: 'freezer'},
        { id: 20, type: 3, name: 'cooking hob'},
        { id: 21, type: 3, name: 'fridge'}
    ],
    accommodations: [
        {
            id: 1,
            name: 'Stylish apartment in el born',
            price: 85,
            coordinates: [41.393592, 2.162570],
            amenities: [7, 10, 16, 18],
            image: require('../images/flat1.png')
        },
        {
            id: 2,
            name: 'A cozy flat near Las Ramblas',
            price: 70,
            coordinates: [41.394195, 2.164844],
            amenities: [6, 12],
            image: require('../images/flat2.png')
        },
        {
            id: 3,
            name: 'Apartment in the classic Barcelona center',
            price: 60,
            coordinates: [41.393732, 2.165551],
            amenities: [1, 7, 13, 15, 20],
            image: require('../images/flat3.png')
        },
        {
            id: 4,
            name: 'Classic Eixample place for rent',
            price: 75,
            coordinates: [41.392794, 2.164888],
            amenities: [2, 7, 11],
            image: require('../images/flat4.png')
        },
        {
            id: 5,
            name: 'Atlantida Beach',
            price: 90,
            coordinates: [41.392876, 2.163260],
            amenities: [19],
            image: require('../images/flat1.png')
        },
        {
            id: 6,
            name: 'Elegant place in Eixample',
            price: 150,
            coordinates: [41.394479, 2.163797],
            amenities: [1, 5, 6, 11, 13, 20],
            image: require('../images/flat2.png')
        },
    ],
    amenitiesFilter: [],
    filteredAccommodations: [],
    resultType: 2
}




