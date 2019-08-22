import { combineReducers } from 'redux';

import application from './application';
import laws from './laws';

const reducers = combineReducers({
    application,
    laws
});

export default reducers;
