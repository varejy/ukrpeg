import { combineReducers } from 'redux';

import application from './application';
import news from './news';
import rvv from './rvv';

const reducers = combineReducers({
    application,
    news,
    rvv
});

export default reducers;
