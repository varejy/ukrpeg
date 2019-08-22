import request from 'superagent';
import base from './base';

import setLawsAction from '../actions/setLaws';

import { TOKEN_LOCAL_STORAGE_NAME } from '../constants/constants';

export default function getLaws () {
    return dispatch => {
        const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_NAME);

        return base(
            request
                .get('/api/admin/law/all')
                .query({ token })
        )
            .then(laws => {
                return dispatch(setLawsAction(laws));
            });
    };
}
