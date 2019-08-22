import request from 'superagent';
import base from './base';

import setLawsAction from '../actions/setLaws';

import { TOKEN_LOCAL_STORAGE_NAME } from '../constants/constants';

export default function deleteLawsById (ids) {
    return dispatch => {
        const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_NAME);

        return base(
            request
                .post('/api/admin/law/delete')
                .send({ ids })
                .query({ token })
        )
            .then(laws => {
                return dispatch(setLawsAction(laws));
            });
    };
}
