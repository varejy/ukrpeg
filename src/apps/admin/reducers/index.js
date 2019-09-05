import { combineReducers } from 'redux';

import application from './application';
import laws from './laws';
import news from './news';
import rvv from './rvv';
import seo from './seo';

const reducers = combineReducers({
    application,
    laws,
    news,
    rvv,
    seo
});

export default reducers;
