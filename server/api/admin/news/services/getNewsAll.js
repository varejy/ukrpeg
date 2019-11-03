import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';

import getAllNews from '../../../client/news/queries/getAllNews';

export default function getNews (req, res) {
    getAllNews()
        .then(newsAll => {
            const sortedNews = newsAll
                .sort((prev, next) => prev.date - next.date);

            res.status(OKEY_STATUS_CODE).send(sortedNews);
        })
        .catch(() => {
            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
