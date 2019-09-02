import {
    SET_AUTHENTICATED,
    SET_CATEGORIES,
    SET_CATEGORIES_SEO
} from '../types/types';

const initialState = {
    authenticated: null,
    newsCategories: [],
    categories: []
};

export default function (state = initialState, action) {
    switch (action.type) {
    case SET_AUTHENTICATED:
        return { ...state, authenticated: action.payload };
    case SET_CATEGORIES:
        return { ...state, newsCategories: action.payload };
    case SET_CATEGORIES_SEO:
        return { ...state, categories: action.payload };
    default:
        return state;
    }
}
