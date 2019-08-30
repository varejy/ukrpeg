import request from 'superagent';
import base from '../base';

import setPartners from '../../actions/setPartners';

export default function getAllPartners (req) {
    return dispatch => {
        const host = req.get('host');

        return base(
            request
                .get(`${host}/api/client/partners/slides`)
                .timeout({
                    deadline: 2000
                })
        )
            .then(slides => {
                dispatch(setPartners(slides));
            })
            .catch(() => {
                dispatch(setPartners([]));
            });
    };
}
