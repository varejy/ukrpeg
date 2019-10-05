import request from 'superagent';
import base from '../base';

import setSlides from '../../actions/setSlides';

export default function getSlides (req) {
    return dispatch => {
        const host = req.get('host');

        return base(
            request
                .get(`${host}/api/client/slides/`)
                .timeout({
                    deadline: 2000
                })
        )
            .then(slides => {
                dispatch(setSlides(slides));
            })
            .catch(() => {
                dispatch(setSlides([]));
            });
    };
}
