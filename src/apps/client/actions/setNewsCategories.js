import { SET_NEWS_CATEGORIES } from '../types/types';

const setNewsCategories = payload => ({
    type: SET_NEWS_CATEGORIES,
    payload
});

export default setNewsCategories;
