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
        this.components.push(new AmenitiesSearchInput());
        this.components.push(new AmenitiesChecksFilter());
    }
}
