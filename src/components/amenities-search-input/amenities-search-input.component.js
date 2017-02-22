import _ from 'lodash';
import $ from 'jquery';
import AmenitiesService from '../../services/amenities.service';
import store from '../../stores/index';
import { addAccommodationFilter } from '../../actions/index';
import BaseComponent from '../base-component/base.component';
import AmenitiesButtonsFilter from '../amenities-buttons-filter/amenities-buttons-filter.component';
import template from './amenities-search-input.template.mustache';
import './amenities-search-input.template.less';
import viewModel from './amenities-search-input.view-model';

export default class AmenitiesSearchInput extends BaseComponent{
    constructor () {
        super();
        this.template = template;
        this.viewModel = viewModel;
        this.partialName = 'amenities_search_input';
        this.components.push(new AmenitiesButtonsFilter());
        store.subscribe(this.onStoreChange.bind(this));
    }

    onStoreChange () {
        let state = store.getState();
        let amenitiesLength = _.get(state, 'accommodationsFilter.amenitiesFilter', []).length;
        if (this.$magnifier && this.$magnifier.length) {
            this.$magnifier[amenitiesLength ? 'hide' : 'show']();
        }

    }

    onRenderComplete () {
        let $container = this.getComponentContainer ();
        this.$searchInput = $container.find('.js-amenities-search-input');
        this.$searchresultItems = $container.find('.js-amenities-search-result-item');
        this.$searchResult = $container.find('.js-amenities-search-result');
        this.$searchContainer = $container.find('.js-amenities-search-state');
        this.$magnifier = $container.find('.js-magnifier');
        this.$searchInput.on('keyup', this.onSearchInputKeyUp.bind(this));
        this.$searchresultItems.on('click', this.onSearchResultItemClick.bind(this));
        this.$searchContainer.on('click', this.onSearchContainerClick.bind(this));
        $(document).on('click', this.onDocumentClick.bind(this));
        this.focusInput ();
        this.showResult();
    }

    onSearchContainerClick () {
        this.focusInput ();
    }

    onDocumentClick (event) {
        let target = $(event.target);
        if(!target.closest('.js-amenities-search-container').length) {
            if(this.$searchResult.is(':visible')) {
                this.closeResult ();
            }
        }
    }

    onSearchResultItemClick (event) {
        let $element = $(event.target);
        let amenityId = parseInt($element.data('id'), 10);
        let amenity = _.find(this.viewModel.amenitiesSearchResult, { id: amenityId });
        if (amenity) {
            this.viewModel.query = '';
            this.$searchInput.val('');
            this.closeResult ();
            this.focusInput ();
            store.dispatch(addAccommodationFilter(amenity));
        }
    }

    onSearchInputKeyUp () {
        let value = this.$searchInput.val();
        if (value && value.length >= 2) {
            _.set(this.viewModel, 'query', value);
            AmenitiesService.getAmenities(value).then(this.onSearchAmenitySuccess.bind(this));
        } else {
            this.closeResult ();
        }
    }

    onSearchAmenitySuccess (result) {
        this.setAmenitiesSearchResult (result);
        this.render();
    }

    showResult () {
        let top = parseInt(this.$searchContainer.height(), 10);
        let amenitiesSearchResultLen = _.get(this.viewModel, 'amenitiesSearchResult', []).length;
        if (top) {
            this.$searchResult.css({ top: (top + 26) + 'px' });
        }
        this.$searchResult[amenitiesSearchResultLen ? 'show' : 'hide']();
    }

    closeResult () {
        this.setAmenitiesSearchResult ([]);
        this.$searchresultItems.off('click');
        this.$searchResult.remove();
    }

    focusInput () {
        this.$searchInput.focus();
        this.$searchInput.val(this.$searchInput.val());
    }

    setAmenitiesSearchResult (result) {
        _.set(this.viewModel, 'amenitiesSearchResult', result);
    }
}
