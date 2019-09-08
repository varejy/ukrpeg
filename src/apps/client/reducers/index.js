import { combineReducers } from 'redux';

import application from './application';
import news from './news';

const reducers = combineReducers({
    application,
    news
});

export default reducers;
