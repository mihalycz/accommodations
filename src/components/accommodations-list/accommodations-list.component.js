import _ from 'lodash';
import $ from 'jquery';
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
        this.widthToHaightRatio = 0.75;
        store.subscribe(this.onStoreChange.bind(this));
    }

    onRenderComplete () {
        let $container = this.getComponentContainer ();
        this.$accommodationItems = $container.find('.js-accommodation-item');
        $(window).resize(this.onWindowResize.bind(this));
        setTimeout(this.onWindowResize.bind(this), 100);
    }

    onWindowResize () {
        this.$accommodationItems.each((index, item) => {
            let $item = $(item);
            this.setDependentHeight ($item, $item);
        });
    }

    onStoreChange () {
        this.refreshResult (LIST_RESULT_TYPE);
        this.onWindowResize();
    }
}