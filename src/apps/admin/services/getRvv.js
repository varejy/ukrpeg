import request from 'superagent';
import base from './base';

import setRvvAction from '../actions/setRvv';

export default function getRvv () {
    return dispatch => {
        return base(
            request
                .get('/api/client/rvv/get')
        )
            .then(rvv => {
                return dispatch(setRvvAction(rvv));
            });
    };
}