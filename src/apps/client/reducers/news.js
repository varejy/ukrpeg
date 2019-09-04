import { SET_NEWS } from '../types/types';

const initialState = {
    newsList: [
        {
            date: +new Date(2019, 7, 11),
            description: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
        },
        {
            date: +new Date(2019, 7, 12),
            description: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
        },
        {

            date: +new Date(2019, 7, 13),
            description: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
        }
    ]
};

export default function (state = initialState, action) {
    switch (action.type) {
    case SET_NEWS:
        return { ...state, newsList: action.payload };
    default:
        return state;
    }
}
