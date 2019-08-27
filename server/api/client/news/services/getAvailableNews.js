import { OKEY_STATUS_CODE, NOT_FOUND_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';

import getNewsById from '../queries/getNewsById';
import editNews from '../queries/editNews';

import getNewsValues from '../utils/getNewsValues';

export default function getAvailableNews (req, res) {
    const { id } = req.query;

    getNewsById(id)
        .then(([news]) => {
            if (!news || news.hidden) {
                return res.status(NOT_FOUND_STATUS_CODE).end();
            }

            editNews(news)
                .then((news) => {
                    res.status(OKEY_STATUS_CODE).send(...getNewsValues(news));
                })
                .catch(() => {
                    res.status(SERVER_ERROR_STATUS_CODE).end();
                });
        })
        .catch(() => {
            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
