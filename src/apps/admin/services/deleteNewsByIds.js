import request from 'superagent';
import base from './base';

import setProductsAction from '../actions/setNews';

import { TOKEN_LOCAL_STORAGE_NAME } from '../constants/constants';

export default function saveProduct (ids) {
    return dispatch => {
        const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_NAME);

        return base(
            request
                .post('/api/admin/news/delete-few')
                .send({ ids })
                .query({ token })
        )
            .then(products => {
                return dispatch(setProductsAction(products));
            });
    };
}
