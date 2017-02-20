import $ from 'jquery';
import BaseComponent from '../base-component/base.component';
import AmenitiesForm from '../amenites-form/amenities-form.component';
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
        this.components.push(new AmenitiesForm());
        this.components.push(new AccommodationResult());
    }

    render() {
        super.render();
    }
}



