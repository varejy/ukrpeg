import {
    SET_LAWS
} from '../types/types';

const initialState = {
    laws: []
};

export default function (state = initialState, action) {
    switch (action.type) {
    case SET_LAWS:
        return { ...state, laws: action.payload };
    default:
        return state;
    }
}
