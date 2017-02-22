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
            let width = parseInt($item.width());
            let height = width * this.widthToHaightRatio;
            $item.height(height);
        });
    }

    onStoreChange () {
        let $component = this.getComponentContainer();
        let state = store.getState();
        let typeId = _.get(state, 'accommodationsFilter.resultType');
        if (typeId && typeId === LIST_RESULT_TYPE) {
            let isSameResult = this.setAccommodations (_.get(state, 'accommodationsFilter.filteredAccommodations', []));
            if (!isSameResult) {
                this.render();
            }
            $component.show();
        } else {
            if ($component.length) {
                $component.hide();
            }
        }
    }

    setAccommodations (accommodations) {
        function getIds (list) {
            return _.join(_.sortBy(_.map(list, (item) => {
                return _.get(item, 'id');
            })), ',');
        }
        let currentAccommodationsIds = getIds(_.get(this.viewModel, 'accommodations'));
        let newAccommodationsIds = getIds(accommodations);
        let isSameResult = currentAccommodationsIds === newAccommodationsIds;
        if (!isSameResult) {
            _.set(this.viewModel, 'accommodations', accommodations);
        }
        return isSameResult;
    }
}