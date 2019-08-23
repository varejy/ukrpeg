import {
    SET_AUTHENTICATED,
    SET_CATEGORIES,
    SET_PARTNERS
} from '../types/types';

const initialState = {
    authenticated: null,
    newsCategories: [],
    partners: []
};

export default function (state = initialState, action) {
    switch (action.type) {
    case SET_AUTHENTICATED:
        return { ...state, authenticated: action.payload };
    case SET_CATEGORIES:
        return { ...state, newsCategories: action.payload };
    case SET_PARTNERS:
        return { ...state, partners: action.payload };
    default:
        return state;
    }
}
