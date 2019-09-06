import {
    SET_RVV_PLANS
} from '../types/types';

const initialState = {
    plans: []
};

export default function (state = initialState, action) {
    switch (action.type) {
    case SET_RVV_PLANS:
        return { ...state, plans: action.payload };
    default:
        return state;
    }
}
