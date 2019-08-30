import {
    SET_AUTHENTICATED,
    SET_CATEGORIES,
    SET_LAW
} from '../types/types';

const initialState = {
    authenticated: null,
    newsCategories: [],
    lawList: []
};

export default function (state = initialState, action) {
    switch (action.type) {
    case SET_AUTHENTICATED:
        return { ...state, authenticated: action.payload };
    case SET_CATEGORIES:
        return { ...state, newsCategories: action.payload };
    case SET_LAW:
        return { ...state, lawList: action.payload };
    default:
        return state;
    }
}
