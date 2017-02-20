import $ from 'jquery';
import _ from 'lodash';
import store from '../../stores/index';
import { setCheckboxesCollapseType, OPENED_COLLAPSE_TYPE, CLOSED_COLLAPSE_TYPE } from '../../actions/index';
import BaseComponent from '../base-component/base.component';
import AmenitiesSearchInput from '../amenities-search-input/amenities-search-input.component';
import AmenitiesChecksFilter from '../amenities-checks-filter/amenities-checks-filter.component';
import template from './amenities-form.template.mustache';
import './amenities-form.template.less';
import viewModel from './amenities-form.view-model';

export default class AmenitiesForm extends BaseComponent{
    constructor () {
        super();
        this.template = template;
        this.viewModel = viewModel;
        this.partialName = 'amenities_form';
        this.amenitiesChecksFilter = new AmenitiesChecksFilter();
        this.components.push(new AmenitiesSearchInput());
        this.components.push(this.amenitiesChecksFilter);
        store.subscribe(this.onStoreChange.bind(this));
    }

    onStoreChange () {
        let state = store.getState();
        this.toggleCollapseButton (_.get(state, 'accommodationsFilter.collapseType'));
    }

    onRenderComplete () {
        let $container = this.getComponentContainer ();
        let state = store.getState();
        this.$collapseButton = $container.find('.js-global-collapse-button');
        this.$collapseButton.on('click', this.onCollapseButtonClick.bind(this));
        this.toggleCollapseButton (_.get(state, 'accommodationsFilter.collapseType'));
    }

    onCollapseButtonClick (event) {
        let $collapseButton = this.getParentByClass($(event.target), '.js-global-collapse-button');
        this.toggleElementClass($collapseButton, $collapseButton.hasClass('close'), 'open', 'close');
        store.dispatch(setCheckboxesCollapseType($collapseButton.hasClass('close') ?  CLOSED_COLLAPSE_TYPE : OPENED_COLLAPSE_TYPE));
    }

    toggleCollapseButton (collapseType) {
        if (this.$collapseButton && this.$collapseButton.length) {
            let isAllFiltersOpened = this.amenitiesChecksFilter.isAllFiltersOpened();
            if (collapseType === OPENED_COLLAPSE_TYPE) {
                this.toggleElementClass(this.$collapseButton, isAllFiltersOpened, 'open', 'close');
            } else {
                this.toggleElementClass(this.$collapseButton, !isAllFiltersOpened, 'close', 'open');
            }
        }
    }
}