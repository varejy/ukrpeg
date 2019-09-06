import request from 'superagent';
import base from './base';

import setPartners from '../actions/setPartners';

import { TOKEN_LOCAL_STORAGE_NAME } from '../constants/constants';

export default function getPartners () {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_NAME);

    return dispatch => base(
        request
            .get('/api/client/partners/all')
            .query({ token })
    )
        .then(partners => {
            return dispatch(setPartners(partners));
        });
}
