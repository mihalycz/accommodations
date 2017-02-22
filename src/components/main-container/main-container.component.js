import $ from 'jquery';
import _ from 'lodash';
import 'jscrollpane';
import BaseComponent from '../base-component/base.component';
import store from '../../stores/index';
import { setAccommodationResultType } from '../../actions/index';
import AmenitiesForm from '../amenites-form/amenities-form.component';
import AmenitiesButtonsFilter from '../amenities-buttons-filter/amenities-buttons-filter.component';
import AccommodationResult from '../accommodations-result/accommodations-result.component';
import template from './main-container.template.mustache';
import './main-container.template.less';
import viewModel from './main-container.view-model';

export default class MainContainer extends BaseComponent{
    constructor (container) {
        super();
        this.$container = $(container);
        this.template = template;
        this.viewModel = viewModel;
        this.components.push(new AmenitiesButtonsFilter());
        this.components.push(new AmenitiesForm());
        this.components.push(new AccommodationResult());
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
        //this.$container.find('.js-scrollable').jScrollPane();
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
        if (this.$offersCount && this.$offersCount.length) {
            this.$offersCount.text(len ? `${accommodations.length} offer${len > 1 ? 's' : ''}` : '');
        }
    }
}



