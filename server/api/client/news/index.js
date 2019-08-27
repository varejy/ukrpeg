import express from 'express';

import getAvailableNews from './services/getAvailableNews';
import getAvailableNewsAll from './services/getAvailableNewsAll';
import getAvailableNewsByIds from './services/getAvailableNewsByIds';
import availableNewsSearch from './services/availableNewsSearch';

const router = express.Router();

router.route('/')
    .get(getAvailableNews);

router.route('/all')
    .get(getAvailableNewsAll);

router.route('/by-ids')
    .post(getAvailableNewsByIds);

router.route('/search')
    .get(availableNewsSearch);

export default router;
