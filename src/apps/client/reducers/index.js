import { combineReducers } from 'redux';

import application from './application';
import news from './news';
import about from './about';

const reducers = combineReducers({
    application,
    news,
    about
});

export default reducers;
