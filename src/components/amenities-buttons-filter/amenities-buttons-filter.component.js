import _ from 'lodash';
import $ from 'jquery';
import BaseComponent from '../base-component/base.component';
import store from '../../stores/index';
import { removeAccommodationFilter } from '../../actions/index';
import template from './amenities-buttons-filter.template.mustache';
import './amenities-buttons-filter.template.less';
import viewModel from './amenities-buttons-filter.view-model';

export default class AmenitiesButtonsFilter extends BaseComponent{
    constructor () {
        super();
        this.template = template;
        this.viewModel = viewModel;
        this.partialName = 'amenities_buttons_filter';
        store.subscribe(this.onStoreChange.bind(this));
    }

    onStoreChange () {
        let state = store.getState();
        this.setAmenities (_.get(state, 'accommodationsFilter.amenitiesFilter', []));
        this.render();
    }

    onRenderComplete () {
        let $container = this.getComponentContainer ();
        this.$amenitiesRemoveButton = $container.find('.js-remove-amenity');
        this.$amenitiesRemoveButton.on('click', this.onRemoveAmenityButtonClick.bind(this));
    }

    onRemoveAmenityButtonClick (event) {
        let $element = $(event.target);
        let amenityId = parseInt($element.data('id'), 10);
        let amenity = _.find(this.viewModel.amenities, { id: amenityId });
        if (amenity) {
            store.dispatch(removeAccommodationFilter(amenity));
        }
    }

    setAmenities (amenities) {
        _.set(this.viewModel, 'amenities', amenities);
    }
}