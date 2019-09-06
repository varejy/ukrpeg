import {
    SET_RVV
} from '../types/types';

const initialState = {
    rvv: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
    case SET_RVV:
        return { ...state, rvv: action.payload };
    default:
        return state;
    }
}
