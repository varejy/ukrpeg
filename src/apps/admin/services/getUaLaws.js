import request from 'superagent';
import base from './base';

import setUaLawsAction from '../actions/setUaLaws';

import { TOKEN_LOCAL_STORAGE_NAME } from '../constants/constants';

export default function getUaLaws () {
    return dispatch => {
        const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_NAME);

        return base(
            request
                .get('/api/admin/ua-law/all')
                .query({ token })
        )
            .then(laws => {
                return dispatch(setUaLawsAction(laws));
            });
    };
}
