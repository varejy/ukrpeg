import { combineReducers } from 'redux';

import application from './application';
import news from './news';
import rvv from './rvv';
import seo from './seo';

const reducers = combineReducers({
    application,
    news,
    rvv,
    seo
});

export default reducers;
