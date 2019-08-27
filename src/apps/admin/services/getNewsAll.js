import request from 'superagent';
import base from './base';

import setNewsAction from '../actions/setNews';

import { TOKEN_LOCAL_STORAGE_NAME } from '../constants/constants';

export default function getProducts () {
    return dispatch => {
        const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_NAME);

        return base(
            request
                .get('/api/admin/news/all')
                .query({ token })
        )
            .then(newsAll => {
                return dispatch(setNewsAction(newsAll));
            });
    };
}
