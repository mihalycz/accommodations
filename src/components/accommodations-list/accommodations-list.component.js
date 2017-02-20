import _ from 'lodash';
import store from '../../stores/index';
import { LIST_RESULT_TYPE } from '../../actions/index';
import BaseComponent from '../base-component/base.component';
import template from './accommodations-list.template.mustache';
import './accommodations-list.template.less';
import viewModel from './accommodations-list.view-model';

export default class AccommodationsList extends BaseComponent{
    constructor () {
        super();
        this.template = template;
        this.viewModel = viewModel;
        this.partialName = 'accommodations_list';
        store.subscribe(this.onStoreChange.bind(this));
    }

    onStoreChange () {
        let state = store.getState();
        let typeId = _.get(state, 'accommodationsFilter.resultType');
        this.setAccommodations (_.get(state, 'accommodationsFilter.filteredAccommodations', []));
        if (typeId && typeId === LIST_RESULT_TYPE) {
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