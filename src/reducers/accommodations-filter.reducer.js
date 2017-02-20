import _ from 'lodash';
import appState from '../state/index';
import { ADD_ACCOMMODATIONS_FILTER, REMOVE_ACCOMMODATION_FILTER, SET_ACCOMMODATION_RESULT_TYPE } from '../actions/index';

function filterAccommodations (amenitiesFilter, accommodation) {
    return !amenitiesFilter.length || _.reduce(amenitiesFilter, (result, amenityFilter) => {
        return result && _.indexOf(accommodation.amenities, _.get(amenityFilter, 'id')) !== -1;
    }, true);
}

function toggleAccommodationFilter (state, action, isRemove) {
    let amenitiesFilter = state.amenitiesFilter;
    let accommodations = state.accommodations;
    let amenity = _.get(action, 'amenity');
    let amenityId = _.get(amenity, 'id');

    if (amenityId) {
        if (isRemove) {
            if (_.find(amenitiesFilter, { id: amenityId })) {
                amenitiesFilter = _.remove(amenitiesFilter, (amenityFilterItem) => {
                    return _.get(amenityFilterItem, 'id') !== amenityId;
                });
                return Object.assign({}, state, {
                    amenitiesFilter: amenitiesFilter,
                    filteredAccommodations: accommodations.filter(filterAccommodations.bind(this, amenitiesFilter))
                });
            }
        } else {
            if (!_.find(amenitiesFilter, { id: amenityId })) {
                amenitiesFilter.push(amenity);
                return Object.assign({}, state, {
                    amenitiesFilter: amenitiesFilter,
                    filteredAccommodations: accommodations.filter(filterAccommodations.bind(this, amenitiesFilter))
                });
            }
        }
    }

    return state;
}

const accommodationsFilter = (state = appState, action) => {
    switch (action.type) {
        case ADD_ACCOMMODATIONS_FILTER:
            return toggleAccommodationFilter (state, action);
        case REMOVE_ACCOMMODATION_FILTER:
            return toggleAccommodationFilter (state, action, true);
        case SET_ACCOMMODATION_RESULT_TYPE:
            let resultType = _.get(action, 'resultType');
            let accommodations = state.accommodations;
            let filteredAccommodations = state.filteredAccommodations;
            if (resultType) {
                return Object.assign({}, state, {
                    resultType: resultType,
                    filteredAccommodations: filteredAccommodations.length ? filteredAccommodations : accommodations
                });
            }
            return state;
        default:
            return state
    }
};

export default accommodationsFilter
