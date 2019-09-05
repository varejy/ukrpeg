import {
    SET_LANG,
    SET_LANG_MAP,
    SET_LANG_ROUTE,
    SET_MEDIA_INFO,
    SET_NEWS_CATEGORIES,
    SET_MENU_OPEN,
    SET_ACTIVE_CATEGORY_INDEX,
    SET_SEO,
    SET_SEARCH,
    SET_LAW
} from '../types/types';
import { DEFAULT_LANG, DEFAULT_LANG_ROUTE } from '../constants/constants';

const initialState = {
    media: {
        width: 0,
        height: 0
    },
    langMap: {},
    lang: DEFAULT_LANG,
    langRoute: DEFAULT_LANG_ROUTE,
    categories: [],
    burgerMenu: false,
    activeCategoryIndex: 0,
    search: ''
    lawList: []
};

export default function (state = initialState, action) {
    switch (action.type) {
    case SET_MEDIA_INFO:
        return { ...state, media: action.payload };
    case SET_LANG:
        return { ...state, lang: action.payload };
    case SET_LANG_MAP:
        return { ...state, langMap: action.payload };
    case SET_LANG_ROUTE:
        return { ...state, langRoute: action.payload };
    case SET_NEWS_CATEGORIES:
        return { ...state, categories: action.payload };
    case SET_MENU_OPEN:
        return { ...state, burgerMenu: action.payload };
    case SET_ACTIVE_CATEGORY_INDEX:
        return { ...state, activeCategoryIndex: action.payload };
    case SET_SEO:
        return { ...state, staticSeo: action.payload };
    case SET_SEARCH:
        return { ...state, search: action.payload };
    case SET_LAW:
        return { ...state, lawList: action.payload };
    default:
        return state;
    }
}
