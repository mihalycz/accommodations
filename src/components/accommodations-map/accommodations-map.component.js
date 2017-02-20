import _ from 'lodash';
import store from '../../stores/index';
import { MAP_RESULT_TYPE } from '../../actions/index';
import BaseComponent from '../base-component/base.component';
import template from './accommodations-map.template.mustache';
import viewModel from './accommodations-map.view-model';

export default class AccommodationsMap extends BaseComponent{
    constructor () {
        super();
        this.template = template;
        this.viewModel = viewModel;
        this.partialName = 'accommodations_map';
        store.subscribe(this.onStoreChange.bind(this));
    }

    onStoreChange () {
        let state = store.getState();
        let typeId = _.get(state, 'accommodationsFilter.resultType');
        this.setAccommodations (_.get(state, 'accommodationsFilter.filteredAccommodations', []));
        if (typeId && typeId === MAP_RESULT_TYPE) {
            this.render();
        } else {
            let $component = this.getComponentContainer();
            if ($component.length) {
                $component.html('');
            }
        }
    }

    setAccommodations (accommodations) {
        _.set(this.viewModel, 'accommodations', accommodations);
    }
}
