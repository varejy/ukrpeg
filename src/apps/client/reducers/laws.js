import { SET_EURO_LAW, SET_UA_LAW } from '../types/types';

const initialState = {
    euro: [],
    ua: []
};

export default function (state = initialState, action) {
    switch (action.type) {
    case SET_UA_LAW:
        return { ...state, ua: action.payload };
    case SET_EURO_LAW:
        return { ...state, euro: action.payload };
    default:
        return state;
    }
}
