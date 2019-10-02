import request from 'superagent';
import base from '../base';

import setEuroLaws from '../../actions/setEuroLaws';

export default function getEuroLaws (req) {
    return dispatch => {
        const host = req.get('host');

        return base(
            request
                .get(`${host}/api/client/euro-law/all`)
                .timeout({
                    deadline: 2000
                })
        )
            .then(laws => {
                dispatch(setEuroLaws(laws));
            })
            .catch(() => {
                dispatch(setEuroLaws([]));
            });
    };
}
