import { SET_RVV } from '../types/types';

const initialState = {
    rvvObj: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
    case SET_RVV:
        return { ...state, rvvObj: action.payload };
    default:
        return state;
    }
}
