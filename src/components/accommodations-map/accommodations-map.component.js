import _ from 'lodash';
import $ from 'jquery';
import store from '../../stores/index';
import config from '../../config';
import { MAP_RESULT_TYPE } from '../../actions/index';
import BaseComponent from '../base-component/base.component';
import template from './accommodations-map.template.mustache';
import './accommodations-map.template.less';
import viewModel from './accommodations-map.view-model';

export default class AccommodationsMap extends BaseComponent{
    constructor () {
        super();
        this.template = template;
        this.viewModel = viewModel;
        this.partialName = 'accommodations_map';
        this.map = null;
        $(window).resize(this.onWindowResize.bind(this));
        store.subscribe(this.onStoreChange.bind(this));
    }

    onRenderComplete () {
        setTimeout(() => {
            this.onWindowResize().then(this.initMap.bind(this));
        }, 100);
    }

    onWindowResize () {
        let $container = this.getComponentContainer();
        let $map = $container.find('.js-map');
        let $scrollableParent = $container.parents('.js-scrollable');
        return this.setHeightByParent ($map, $scrollableParent);
    }

    onStoreChange () {
        this.refreshResult (MAP_RESULT_TYPE);
    }

    initMap () {
        let maps = _.get(window, 'google.maps');
        if (maps) {
             this.map = new maps.Map(document.getElementById('map'), {
                 styles: config.mapStyles,
                 center: new google.maps.LatLng('41.394479', '2.163797'),
                 zoom: 17
            });
            this.setMarkers();
        }
    }

    setMarkers () {
        let maps = _.get(window, 'google.maps');
        if (this.map && maps) {
            let accommodations = _.get(this.viewModel, 'accommodations');
            let coordinates = _.map(accommodations, (accommodation) => {
                let coordinate = _.get(accommodation, 'coordinates');
                let price = _.get(accommodation, 'price');
                let position = new maps.LatLng (coordinate[0], coordinate[1]);
                let image = {
                    url: require('../../images/pin.png'),
                    size: new maps.Size(40, 48),
                    origin: new maps.Point(0, 0),
                    anchor: new maps.Point(20, 24),
                };
                new maps.Marker({
                    position: position,
                    map: this.map,
                    label: {
                        text: `\u20AC${price}`,
                        color: 'white'
                    },
                    icon: image,
                });
                return position;
            });
            let latLngBounds = new maps.LatLngBounds();
            for (let latLng of coordinates) {
                latLngBounds.extend(latLng);
            }
            this.map.setCenter(latLngBounds.getCenter());
            this.map.fitBounds(latLngBounds);
        }
    }
}
