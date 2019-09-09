import request from 'superagent';
import base from '../base';

import setRvv from '../../actions/setRvv';

export default function getRvv (req) {
    return dispatch => {
        const host = req.get('host');

        return base(
            request
                .get(`${host}/api/client/rvv/`)
                .timeout({
                    deadline: 2000
                })
        )
            .then((rvv) => {
                dispatch(setRvv(rvv));
            })
            .catch(() => {
                dispatch(setRvv({}));
            });
    };
}
