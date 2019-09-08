import uniqid from 'uniqid';

import { OKEY_STATUS_CODE, NOT_FOUND_STATUS_CODE, SERVER_ERROR_STATUS_CODE, MONGODB_DUPLICATE_CODE } from '../../../../constants/constants';

import prepareNews from '../utils/prepareNews';

import saveNewsQuery from '../../../client/news/queries/saveNews';

export default function saveNews (req, res) {
    const news = prepareNews(req.body);
    const id = uniqid();
    const date = +Date.now();

    saveNewsQuery({ ...news, id, date })
        .then(news => {
            res.status(OKEY_STATUS_CODE).send(news);
        })
        .catch((err) => {
            if (err.code === MONGODB_DUPLICATE_CODE) {
                return res.status(NOT_FOUND_STATUS_CODE).send({ code: 'duplication' });
            }

            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
