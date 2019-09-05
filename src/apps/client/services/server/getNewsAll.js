import request from 'superagent';
import base from '../base';

import setNews from '../../actions/setNews';

export default function getNewsAll (req) {
    return dispatch => {
        const host = req.get('host');

        return base(
            request
                .get(`${host}/api/client/news/all`)
                .timeout({
                    deadline: 2000
                })
        )
            .then(news => {
                dispatch(setNews(news));
            })
            .catch(() => {
                dispatch(setNews([]));
            });
    };
}
