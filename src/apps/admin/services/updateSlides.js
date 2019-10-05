import request from 'superagent';
import base from './base';

import setSlides from '../actions/setSlides';

import { TOKEN_LOCAL_STORAGE_NAME } from '../constants/constants';

export default function updateSlides (data) {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_NAME);

    return dispatch => base(
        request
            .post('/api/admin/slides/update')
            .query({ token })
            .send(data)
    )
        .then(slides => {
            return dispatch(setSlides(slides));
        });
}
