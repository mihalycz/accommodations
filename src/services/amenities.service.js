import _ from 'lodash';
import appState from '../state/index';

export default class AmenitiesService {
    static getAmenities (query) {
        return new Promise((resolve) => {
            resolve(_.filter(appState.amenities, (amenity) => {
                return _.startsWith(_.get(amenity, 'name'), _.toLower(query));
            }));
        });
    }

    static getAmenitiesGroups () {
        let groups = [];
        const itemsPerPage = 6;
        _.each(appState.amenitiesTypes, (type) => {
            let amenities = _.filter(appState.amenities, { type: _.get(type, 'id') });
            let amenitiesPaged = [];
            let amenitiesLen = amenities.length;
            let index = 0;
            while (index < amenitiesLen) {
                let end = index + itemsPerPage;
                amenitiesPaged.push( _.slice(amenities, index, end));
                index = end;
            }
            groups.push({
                name: _.get(type, 'name'),
                amenities: amenitiesPaged
            });
        });
        return groups;
    }

    static getAmenityById (id) {
        return _.find(appState.amenities, { id: id });
    }
}
