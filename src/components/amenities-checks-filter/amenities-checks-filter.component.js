import _ from 'lodash';
import $ from 'jquery';
import AmenitiesService from '../../services/amenities.service';
import BaseComponent from '../base-component/base.component';
import store from '../../stores/index';
import { removeAccommodationFilter, addAccommodationFilter } from '../../actions/index';
import template from './amenities-checks-filter.template.mustache';
import './amenities-checks-filter.template.less';
import viewModel from './amenities-checks-filter.view-model';

export default class AmenitiesChecksFilter extends BaseComponent{
    constructor () {
        super();
        this.template = template;
        this.viewModel = viewModel;
        this.partialName = 'amenities_checks_filter';
        this.isReCheck = true;
        store.subscribe(this.onStoreChange.bind(this));
    }

    onStoreChange () {
        let state = store.getState();
        this.setAmenities (_.get(state, 'accommodationsFilter.amenitiesFilter', []));
        if (this.isReCheck) {
            this.checkAmenities();
        }
        this.isReCheck = true;
    }

    onRenderComplete () {
        let $container = this.getComponentContainer ();
        this.$amenitiesCheckboxes = $container.find('.js-amenity-checkbox');
        this.$collapseButton = $container.find('.js-collapse-button');
        this.$checkboxes = $container.find('input[type=checkbox]');
        this.$amenitiesCheckboxes.on('change', this.onCheckChange.bind(this));
        this.$collapseButton.on('click', this.onCollapseButtonClick.bind(this));
        //this.toggleBottomCheckBoxes ();
    }

    onCollapseButtonClick () {

    }

    onCheckChange (event) {
        let $element = $(event.target);
        let amenityId = parseInt($element.val(), 10);
        let amenity = _.find(this.viewModel.amenities, { id: amenityId });
        if (this.isReCheck) {
            this.isReCheck = false;
            if (amenity) {
                store.dispatch(removeAccommodationFilter(amenity));
            } else {
                store.dispatch(addAccommodationFilter(AmenitiesService.getAmenityById(amenityId)));
            }
        }
    }

    toggleBottomCheckBoxes () {
        let isClosed = this.$collapseButton.hasClass('close');
        this.$checkboxes.each((index, element) => {
            if (index >= 5) {
                let $checkbox = $(element);
                $checkbox[isClosed ? 'hide' : 'show']();
            }
        });
    }

    setAmenities (amenities) {
        _.set(this.viewModel, 'amenities', amenities);
    }

    checkAmenities () {
        this.isReCheck = false;
        this.$amenitiesCheckboxes.each((index, element) => {
            let $checkbox = $(element);
            let amenityId = parseInt($checkbox.val(), 10);
            let amenity = _.find(this.viewModel.amenities, { id: amenityId });
            $checkbox.prop('checked', !!amenity);
        });
        this.isReCheck = true;
    }
}
