import BaseComponent from '../base-component/base.component';
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
        this.components.push(new AccommodationsList());
        this.components.push(new  AccommodationsMap());
    }
}

