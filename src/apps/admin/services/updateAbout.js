import request from 'superagent';
import base from './base';

import setAbout from '../actions/setAbout';

import { TOKEN_LOCAL_STORAGE_NAME } from '../constants/constants';

export default function updateAbout (data) {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_NAME);

    return dispatch => base(
        request
            .post('/api/admin/about/update')
            .query({ token })
            .send(data)
    )
        .then(slides => {
            return dispatch(setAbout(slides));
        });
}
