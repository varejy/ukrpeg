import {
    SET_AUTHENTICATED,
    SET_CATEGORIES,
    SET_PARTNERS,
    SET_LAW, SET_ABOUT
} from '../types/types';

const initialState = {
    authenticated: null,
    newsCategories: [],
    partners: [],
    categories: [],
    lawList: []
};

export default function (state = initialState, action) {
    switch (action.type) {
    case SET_AUTHENTICATED:
        return { ...state, authenticated: action.payload };
    case SET_CATEGORIES:
        return { ...state, newsCategories: action.payload };
    case SET_PARTNERS:
        return { ...state, partners: action.payload };
    case SET_ABOUT:
        return { ...state, about: action.payload };
    case SET_LAW:
        return { ...state, lawList: action.payload };
    default:
        return state;
    }
}
