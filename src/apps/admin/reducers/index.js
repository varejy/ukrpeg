import { combineReducers } from 'redux';

import application from './application';
import laws from './laws';
import news from './news';

const reducers = combineReducers({
    application,
    laws,
    news
});

export default reducers;
