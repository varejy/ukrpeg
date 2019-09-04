import { combineReducers } from 'redux';

import application from './application';
import laws from './laws';
import news from './news';
import rvv from './rvv';

const reducers = combineReducers({
    application,
    laws,
    news,
    rvv
});

export default reducers;
