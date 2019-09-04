import express from 'express';

import getAvailableLaw from './services/getAvailableLaw';
import getAvailableLaws from './services/getAvailableLaws';
import getAvailableLawsByIds from './services/getAvailableLawsByIds';
import availableLawsSearch from './services/availableLawsSearch';

const router = express.Router();

router.route('/')
    .get(getAvailableLaw);

router.route('/all')
    .get(getAvailableLaws);

router.route('/by-ids')
    .post(getAvailableLawsByIds);

router.route('/search')
    .get(availableLawsSearch);

export default router;
