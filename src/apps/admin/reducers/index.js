import { combineReducers } from 'redux';

import application from './application';
import news from './news';
import seo from './seo';

const reducers = combineReducers({
    application,
    news,
    seo
});

export default reducers;
