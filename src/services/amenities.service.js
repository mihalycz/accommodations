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
        _.each(appState.amenitiesTypes, (type) => {
            groups.push({
                name: _.get(type, 'name'),
                amenities:  _.filter(appState.amenities, { type: _.get(type, 'id') })
            });
        });
        return groups;
    }

    static getAmenityById (id) {
        return _.find(appState.amenities, { id: id });
    }
}
