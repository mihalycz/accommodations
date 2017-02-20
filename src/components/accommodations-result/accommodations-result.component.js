import $ from 'jquery';
import _ from 'lodash';
import BaseComponent from '../base-component/base.component';
import store from '../../stores/index';
import { setAccommodationResultType } from '../../actions/index';
import AmenitiesButtonsFilter from '../amenities-buttons-filter/amenities-buttons-filter.component';
import AccommodationsList from '../accommodations-list/accommodations-list.component';
import AccommodationsMap from '../accommodations-map/accommodations-map.component'
import template from './accommodations-result.template.mustache';
import './accommodations-result.template.less';
import viewModel from './accommodations-result.view-model';

export default class AccommodationsResult extends BaseComponent{
    constructor () {
        super();
        this.template = template;
        this.viewModel = viewModel;
        this.partialName = 'accommodations_result';
        this.components.push(new AmenitiesButtonsFilter());
        this.components.push(new AccommodationsList());
        this.components.push(new  AccommodationsMap());
        store.subscribe(this.onStoreChange.bind(this));
    }

    onStoreChange () {
        let state = store.getState();
        this.setOffersCount (_.get(state, 'accommodationsFilter.filteredAccommodations', []));
    }

    onRenderComplete () {
        let $container = this.getComponentContainer ();
        let state = store.getState();
        let typeId = _.get(state, 'accommodationsFilter.resultType');
        this.$resultTypeTab = $container.find('.js-result-type-tab');
        this.$offersCount = $container.find('.js-offers-count');
        this.$resultTypeTab.on('click', this.onResultTypeTabClick.bind(this));
        if (typeId) {
            this.$resultTypeTab.filter(`[data-type='${typeId}']`).addClass('selected');
            store.dispatch(setAccommodationResultType(typeId));
        }
    }

    onResultTypeTabClick (event) {
        let $element = $(event.target);
        let typeId = parseInt($element.data('type'), 10);
        if (typeId) {
            $element.addClass('selected');
            this.$resultTypeTab.filter(`[data-type!='${typeId}']`).removeClass('selected');
            store.dispatch(setAccommodationResultType(typeId));
        }
    }

    setOffersCount (accommodations) {_.set(this.viewModel, 'offersCount', accommodations.length);
        let len = accommodations.length;
        this.$offersCount.text(len ? `${accommodations.length} offer${len > 1 ? 's' : ''}` : '');
    }
}

