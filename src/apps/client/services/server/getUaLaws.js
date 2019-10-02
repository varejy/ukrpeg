import request from 'superagent';
import base from '../base';

import setUaLaws from '../../actions/setUaLaws';

export default function getUaLaws (req) {
    return dispatch => {
        const host = req.get('host');

        return base(
            request
                .get(`${host}/api/client/ua-law/all`)
                .timeout({
                    deadline: 2000
                })
        )
            .then(laws => {
                dispatch(setUaLaws(laws));
            })
            .catch(() => {
                dispatch(setUaLaws([]));
            });
    };
}
