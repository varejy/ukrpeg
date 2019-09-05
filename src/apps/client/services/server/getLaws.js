import request from 'superagent';
import base from '../base';

import setLaws from '../../actions/setLaws';

export default function getLaws (req) {
    return dispatch => {
        const host = req.get('host');

        return base(
            request
                .get(`${host}/api/client/law/all`)
                .timeout({
                    deadline: 2000
                })
        )
            .then(laws => {
                dispatch(setLaws(laws));
            })
            .catch(() => {
                dispatch(setLaws([]));
            });
    };
}
