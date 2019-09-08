import request from 'superagent';
import base from './base';

import setAbout from '../actions/setAbout';

import { TOKEN_LOCAL_STORAGE_NAME } from '../constants/constants';

export default function getAbout () {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_NAME);

    return dispatch => base(
        request
            .get('/api/client/about')
            .query({ token })
    )
        .then(about => {
            return dispatch(setAbout(about));
        });
}
