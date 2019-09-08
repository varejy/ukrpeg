import request from 'superagent';
import base from '../base';

import setPartners from '../../actions/setPartners';

export default function getPartners (req) {
    return dispatch => {
        const host = req.get('host');

        return base(
            request
                .get(`${host}/api/client/partners/all`)
                .timeout({
                    deadline: 2000
                })
        )
            .then(news => {
                dispatch(setPartners(news));
            })
            .catch(() => {
                dispatch(setPartners([]));
            });
    };
}
