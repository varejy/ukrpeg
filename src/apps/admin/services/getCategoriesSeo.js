import request from 'superagent';
import base from './base';

import setCategoriesAction from '../actions/setCategoriesSeo';

import { TOKEN_LOCAL_STORAGE_NAME } from '../constants/constants';

export default function getCategoriesSeo () {
    return dispatch => {
        const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_NAME);

        return base(
            request
                .get('/api/admin/newsCategory/all')
                .query({ token })
        )
            .then(categories => {
                return dispatch(setCategoriesAction(categories));
            });
    };
}
