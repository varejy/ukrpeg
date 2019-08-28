import { combineReducers } from 'redux';

import application from './application';
import news from './news';
import about from './about';
import law from './law';

const reducers = combineReducers({
    application,
    news,
    about,
    law
});

export default reducers;
