import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';

import findNewsByName from '../queries/findNewsByName';

export default function availableNewsSearch (req, res) {
    const { text } = req.query;

    findNewsByName(text)
        .then(newsAll => {
            const availableNews = newsAll
                .filter(news => !news.hidden)
                .sort((prev, next) => next.date - prev.date);

            console.log(newsAll)

            res.status(OKEY_STATUS_CODE).send({ 
                news: availableNews,
                pages: [] 
            });
        })
        .catch(() => {
            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
