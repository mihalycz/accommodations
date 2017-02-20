import AmenitiesService from '../../services/amenities.service';

export default {
    amenities: [],
    amenitiesGroups: AmenitiesService.getAmenitiesGroups()
}
