import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';

import getNewsByIds from '../queries/getNewsByIds';

export default function getAvailableNewsByIds (req, res) {
    const ids = req.body;

    getNewsByIds(ids)
        .then(newsAll => {
            const availableNews = newsAll
                .filter(news => !news.hidden)
                .sort((prev, next) => next.date - prev.date);

            res.status(OKEY_STATUS_CODE).send(availableNews);
        })
        .catch(() => {
            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
