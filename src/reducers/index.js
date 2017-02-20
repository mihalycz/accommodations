import { combineReducers } from 'redux';
import accommodationsFilter from './accommodations-filter.reducer';

const accommodationsApp = combineReducers({
    accommodationsFilter,
});

export default accommodationsApp;
