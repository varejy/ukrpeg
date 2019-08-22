import request from 'superagent';
import base from './base';

import { TOKEN_LOCAL_STORAGE_NAME } from '../constants/constants';

import setProductsAction from '../actions/setNews';

export default function search (text) {
    return dispatch => {
        const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_NAME);

        return base(
            request
                .get('/api/admin/news/find')
                .query({ token, text })
        )
            .then(products => {
                return dispatch(setProductsAction(products));
            });
    };
}
