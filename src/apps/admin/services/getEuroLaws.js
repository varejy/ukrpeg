import request from 'superagent';
import base from './base';

import setEuroLawsAction from '../actions/setEuroLaws';

import { TOKEN_LOCAL_STORAGE_NAME } from '../constants/constants';

export default function getEuroLaws () {
    return dispatch => {
        const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_NAME);

        return base(
            request
                .get('/api/admin/euro-law/all')
                .query({ token })
        )
            .then(laws => {
                return dispatch(setEuroLawsAction(laws));
            });
    };
}
