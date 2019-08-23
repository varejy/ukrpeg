import request from 'superagent';
import base from './base';

import setPartners from '../actions/setPartners';

import { TOKEN_LOCAL_STORAGE_NAME } from '../constants/constants';

export default function updateSlides (data) {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_NAME);

    return dispatch => base(
        request
            .post('/api/admin/partners/update-slides')
            .query({ token })
            .send(data)
    )
        .then(slides => {
            return dispatch(setPartners(slides));
        });
}
