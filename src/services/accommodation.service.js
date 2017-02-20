import _ from 'lodash';
import appState from '../state/index';

export default class AmenitiesService {
    static getAccommodations () {
        return appState.accommodations;
    }
}

