import request from 'superagent';
import base from '../base';

import setAbout from '../../actions/setAbout';

export default function getAbout (req) {
    return dispatch => {
        const host = req.get('host');

        return base(
            request
                .get(`${host}/api/client/about/`)
                .timeout({
                    deadline: 2000
                })
        )
            .then(about => {
                dispatch(setAbout(about));
            })
            .catch(() => {
                dispatch(setAbout([]));
            });
    };
}
