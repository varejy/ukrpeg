import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';

import findNewsByText from '../../news/queries/findNewsByText';

export default function availableNewsSearch (req, res) {
    const { text } = req.query;

    findNewsByText(text)
        .then(newsAll => {
            const availableNews = newsAll
                .filter(news => !news.hidden)
                .sort((prev, next) => next.date - prev.date);

            res.status(OKEY_STATUS_CODE).send({
                news: availableNews,
                pages: []
            });
        })
        .catch(() => {
            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
