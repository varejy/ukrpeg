import { SET_NEWS } from '../types/types';

const initialState = {
    news: [ ]
};

export default function (state = initialState, action) {
    switch (action.type) {
    case SET_NEWS:
        return { ...state, news: action.payload };
    default:
        return state;
    }
}
