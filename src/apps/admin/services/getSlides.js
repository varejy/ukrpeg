import request from 'superagent';
import base from './base';

import setSlides from '../actions/setSlides';

import { TOKEN_LOCAL_STORAGE_NAME } from '../constants/constants';

export default function getAbout () {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_NAME);

    return dispatch => base(
        request
            .get('/api/client/slides')
            .query({ token })
    )
        .then(slides => {
            return dispatch(setSlides(slides));
        });
}
