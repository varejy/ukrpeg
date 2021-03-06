import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';

import findNewsByTextQuery from '../../../client/news/queries/findNewsByText';

export default function findNewsByText (req, res) {
    const { text } = req.query;

    findNewsByTextQuery(text)
        .then(newsAll => {
            res.status(OKEY_STATUS_CODE).send(newsAll);
        })
        .catch(() => {
            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
