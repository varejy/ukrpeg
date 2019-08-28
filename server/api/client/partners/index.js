import express from 'express';

import getPartners from './services/getPartners';

const router = express.Router();

router.route('/partners')
    .get(getPartners);

export default router;
