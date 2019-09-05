import { combineReducers } from 'redux';

import application from './application';
import laws from './laws';
import news from './news';
import seo from './seo';

const reducers = combineReducers({
    application,
    laws,
    news,
    seo
});

export default reducers;
