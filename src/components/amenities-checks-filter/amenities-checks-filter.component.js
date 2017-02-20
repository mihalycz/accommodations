import _ from 'lodash';
import $ from 'jquery';
import AmenitiesService from '../../services/amenities.service';
import BaseComponent from '../base-component/base.component';
import store from '../../stores/index';
import { removeAccommodationFilter, addAccommodationFilter, setCheckboxesCollapseType, OPENED_COLLAPSE_TYPE, CLOSED_COLLAPSE_TYPE } from '../../actions/index';
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
        this.isStoreChange = false;
        this.isStoreDispatched = false;
        store.subscribe(this.onStoreChange.bind(this));
    }

    onStoreChange () {
        let state = store.getState();
        this.setAmenities (_.get(state, 'accommodationsFilter.amenitiesFilter', []));
        if (this.isReCheck) {
            this.checkAmenities();
        }
        this.isReCheck = true;
        this.isStoreChange = true;
        if (!this.isStoreDispatched) {
            this.toggleAllBottomCheckBoxes (_.get(state, 'accommodationsFilter.collapseType'));
        }
        this.isStoreChange = false;
        this.isStoreDispatched = false;
    }

    onRenderComplete () {
        let $container = this.getComponentContainer ();
        let state = store.getState();
        this.$amenitiesCheckboxes = $container.find('.js-amenity-checkbox');
        this.$collapseButton = $container.find('.js-collapse-button');
        this.$amenitiesCheckboxes.on('change', this.onCheckChange.bind(this));
        this.$collapseButton.on('click', this.onCollapseButtonClick.bind(this));
        this.toggleAllBottomCheckBoxes (_.get(state, 'accommodationsFilter.collapseType'));
    }

    onCollapseButtonClick (event) {
        let $collapseButton = this.getParentByClass($(event.target), '.js-collapse-button');
        this.toggleElementClass($collapseButton, $collapseButton.hasClass('close'), 'open', 'close');
        this.toggleBottomCheckBoxes ($collapseButton);
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

    toggleAllBottomCheckBoxes (collapseType) {
        this.$collapseButton.each((index, element) => {
            let $collapseButton = $(element);
            this.toggleElementClass($collapseButton, collapseType === OPENED_COLLAPSE_TYPE, 'open', 'close');
            this.toggleBottomCheckBoxes ($collapseButton);
        });
    }



    toggleBottomCheckBoxes ($collapseButton) {
        if (this.isHasPages ($collapseButton)) {
            let isClosed = $collapseButton.hasClass('close');
            $collapseButton.next().find('div.js-amenity-page').each((index, element) => {
                if (index) {
                    let $checkboxesContainer = $(element);
                    $checkboxesContainer[isClosed ? 'hide' : 'show']();
                }
            });
            if (!this.isStoreChange) {
                this.isStoreDispatched = true;
                store.dispatch(setCheckboxesCollapseType(isClosed ?  CLOSED_COLLAPSE_TYPE : OPENED_COLLAPSE_TYPE));
            }
        }
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

    isAllFiltersOpened () {
        let result = true;
        this.$collapseButton.each((index, element) => {
            let $collapseButton = $(element);
            result = result && ($collapseButton.hasClass('open') || !this.isHasPages ($collapseButton));
        });
        return result;
    }

    isHasPages ($collapseButton) {
        return $collapseButton.next().find('div.js-amenity-page').length > 1;
    }
}
