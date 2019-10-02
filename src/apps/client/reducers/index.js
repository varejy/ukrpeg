import { combineReducers } from 'redux';

import application from './application';
import news from './news';
import rvv from './rvv';
import laws from './laws';

const reducers = combineReducers({
    application,
    news,
    laws,
    rvv
});

export default reducers;
