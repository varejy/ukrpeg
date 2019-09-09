import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';

import findNewsByText from '../../news/queries/findNewsByText';
import findAboutPageByText from '../queries/findAboutPageByText';
import findRvvPageByText from '../queries/findRvvPageByText';
import findLegislationPageByText from '../queries/findLegislationPageByText';

export default function availableNewsSearch (req, res) {
    const { text = '' } = req.query;

    Promise.all([
        findNewsByText(text),
        findAboutPageByText(text),
        findRvvPageByText(text),
        findLegislationPageByText(text)
    ])
        .then(([newsAll, about, rvv, laws]) => {
            const availableNews = newsAll
                .filter(news => !news.hidden)
                .sort((prev, next) => next.date - prev.date);
            const pages = [];

            if (about.length) {
                pages.push({
                    texts: {
                        ua: {
                            name: 'Про нас'
                        },
                        en: {
                            name: 'About us'
                        }
                    },
                    path: '/about'
                });
            }

            if (rvv.length) {
                pages.push({
                    texts: {
                        ua: {
                            name: 'Рвв'
                        },
                        en: {
                            name: 'Rwr'
                        }
                    },
                    path: '/rvv'
                });
            }

            if (laws.length) {
                pages.push({
                    texts: {
                        ua: {
                            name: 'Законодавство'
                        },
                        en: {
                            name: 'Legislation'
                        }
                    },
                    path: '/laws'
                });
            }

            res.status(OKEY_STATUS_CODE).send({
                news: availableNews,
                pages
            });
        })
        .catch(() => {
            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
