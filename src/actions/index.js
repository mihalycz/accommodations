export const ADD_ACCOMMODATIONS_FILTER = 'ADD_ACCOMMODATIONS_FILTER';
export const REMOVE_ACCOMMODATION_FILTER = 'REMOVE_ACCOMMODATION_FILTER';
export const SET_ACCOMMODATION_RESULT_TYPE = 'SET_ACCOMMODATION_RESULT_TYPE';
export const SET_CHECKBOXES_COLLAPSE_TYPE = 'SET_CHECKBOXES_COLLAPSE_TYPE';

export const MAP_RESULT_TYPE = 1;
export const LIST_RESULT_TYPE = 2;

export const OPENED_COLLAPSE_TYPE = 1;
export const CLOSED_COLLAPSE_TYPE = 2;

export const addAccommodationFilter = (amenity) => {
    return {
        type: ADD_ACCOMMODATIONS_FILTER,
        amenity
    }
};

export const removeAccommodationFilter = (amenity) => {
    return {
        type: REMOVE_ACCOMMODATION_FILTER,
        amenity
    }
};

export const setAccommodationResultType = (resultType) => {
    return {
        type: SET_ACCOMMODATION_RESULT_TYPE,
        resultType
    }
};

export const setCheckboxesCollapseType = (collapseType) => {
    return {
        type: SET_CHECKBOXES_COLLAPSE_TYPE,
        collapseType
    }
}

