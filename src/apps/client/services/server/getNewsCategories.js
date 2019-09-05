import request from 'superagent';
import base from '../base';

import setNewsCategories from '../../actions/setNewsCategories';

export default function getNewsAll (req) {
    return dispatch => {
        const host = req.get('host');

        return base(
            request
                .get(`${host}/api/client/newsCategory/all`)
                .timeout({
                    deadline: 2000
                })
        )
            .then(categories => {
                dispatch(setNewsCategories(categories));
            })
            .catch(() => {
                dispatch(setNewsCategories([]));
            });
    };
}
