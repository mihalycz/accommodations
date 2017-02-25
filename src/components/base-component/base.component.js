import _ from 'lodash';
import $ from 'jquery';

export default class BaseComponent {
    constructor () {
        this.$container = null;
        this.template = null;
        this.viewModel = null;
        this.partialName = null;
        this.components = [];
    }

    render () {
        let $container = this.getComponentContainer();
        if ($container.length && _.isFunction(this.template)) {
            $container.html(this.template(this.viewModel || {}, this.getPartialsMap()));
        }
        _.each(this.components, (component) => {
            component.render();
        });
        if (_.isFunction(this.onRenderComplete)) {
            this.onRenderComplete();
        }
    }

    getPartialsMap () {
        let map = {};
        _.each(this.components, (component) => {
            if (_.isFunction(component.getComponentSetup)) {
                let setup = component.getComponentSetup();
                let partialName = _.get(setup, 'partialName');
                let viewModel = _.get(setup, 'viewModel');
                let template = _.get(setup, 'template');
                let container = _.get(setup, 'container');
                if (partialName && _.isFunction(template)) {
                    let html = template(viewModel || {});
                    if (!container) {
                        html = `<div data-component='${partialName}'>${html}</div>`;
                    }
                    map[partialName] = html;
                }
            }
        });
        return map;
    }

    getComponentContainer () {
        return this.$container || $(`[data-component='${this.partialName}']`);
    }

    getComponentSetup () {
        return {
            partialName: this.partialName,
            template: this.template,
            viewModel: this.viewModel,
            container: this.$container
        }
    }

    toggleElementClass ($element, condition, trueClass, falseClass) {
        if ($element && $element.length) {
            if (condition) {
                $element.removeClass(falseClass);
                $element.addClass(trueClass);
            } else {
                $element.removeClass(trueClass);
                $element.addClass(falseClass);
            }
        }
    }

    getParentByClass ($element, className) {
        if (!$element.hasClass(className)) {
            $element = $element.parent(className);
        }
        return $element;
    }

    setDependentHeight ($item, $dependentItem = $item, correction) {
        if ($item && $item.length && $dependentItem && $dependentItem.length) {
            let width = parseInt($item.width());
            let height = Math.floor(width * this.widthToHaightRatio) - (isNaN(correction) ? 0 : correction);
            if ($item === $dependentItem) {
                $item.height(height);
            } else {
                $dependentItem.height(height);
            }
        }
    }

    setDependentTopByHeight ($item, $dependentItem, correction) {
        if ($item && $item.length && $dependentItem && $dependentItem.length) {
            let height = parseInt($item.height());
            if (!isNaN(height)) {
                $dependentItem.css('top', height + (isNaN(correction) ? 0 : correction));
            }
        }
    }
}
