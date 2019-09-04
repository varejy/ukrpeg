import { SET_ACTIVE_CATEGORY_INDEX } from '../types/types';

const setActiveCategoryIndex = payload => ({
    type: SET_ACTIVE_CATEGORY_INDEX,
    payload
});

export default setActiveCategoryIndex;
