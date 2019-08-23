import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';

import getAllNews from '../../../client/news/queries/getAllNews';

export default function getNews (req, res) {
    getAllNews()
        .then(newsAll => {
            res.status(OKEY_STATUS_CODE).send(newsAll);
        })
        .catch(() => {
            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
