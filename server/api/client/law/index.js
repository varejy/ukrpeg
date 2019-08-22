import express from 'express';

import getAvailableLaw from './services/getAvailableProduct';
import getAvailableLaws from './services/getAvailableProducts';
import getAvailableLawsByIds from './services/getAvailableProductsByIds';
import availableLawsSearch from './services/availableProductsSearch';

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
