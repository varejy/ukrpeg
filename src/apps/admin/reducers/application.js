import {
    SET_AUTHENTICATED,
    SET_CATEGORIES,
    SET_PARTNERS,
    SET_EURO_LAW,
    SET_UA_LAW,
    SET_ABOUT,
    SET_MAIN_SLIDES
} from '../types/types';

const initialState = {
    authenticated: null,
    newsCategories: [],
    partners: [],
    categories: [],
    lawList: [],
    mainSlides: []
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
    case SET_EURO_LAW:
        return { ...state, euroLawList: action.payload };
    case SET_UA_LAW:
        return { ...state, uaLawList: action.payload };
    case SET_MAIN_SLIDES:
        return { ...state, mainSlides: action.payload };
    default:
        return state;
    }
}
