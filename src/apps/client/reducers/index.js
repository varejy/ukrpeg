import { combineReducers } from 'redux';

import application from './application';
import news from './news';
import rvv from './rvv';
import about from './about';

const reducers = combineReducers({
    application,
    news,
    rvv,
    about
});

export default reducers;
