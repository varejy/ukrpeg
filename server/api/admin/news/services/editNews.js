import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';

import prepareNews from '../utils/prepareNews';

import editNewsQuery from '../../../client/news/queries/editNews';

export default function editNews (req, res) {
    const news = prepareNews(req.body);

    editNewsQuery(news)
        .then(news => {
            res.status(OKEY_STATUS_CODE).send(news);
        })
        .catch(() => {
            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
