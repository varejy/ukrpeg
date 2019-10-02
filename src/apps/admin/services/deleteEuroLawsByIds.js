import request from 'superagent';
import base from './base';
import setLawsAction from '../actions/setEuroLaws';

import { TOKEN_LOCAL_STORAGE_NAME } from '../constants/constants';

export default function deleteEuroLawsByIds (ids) {
    return dispatch => {
        const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_NAME);

        return base(
            request
                .post('/api/admin/euro-law/delete')
                .send({ ids })
                .query({ token })
        )
            .then(laws => {
                return dispatch(setLawsAction(laws));
            });
    };
}
