import express from 'express';

import getAvailableNews from './services/getAvailableNews';
import getAvailableNewsAll from './services/getAvailableNewsAll';
import getAvailableNewsByIds from './services/getAvailableNewsByIds';

const router = express.Router();

router.route('/')
    .get(getAvailableNews);

router.route('/all')
    .get(getAvailableNewsAll);

router.route('/by-ids')
    .post(getAvailableNewsByIds);

export default router;
