import express from 'express';

import getAvailableLaws from './services/getAvailableLaws';

const router = express.Router();

router.route('/all')
    .get(getAvailableLaws);

export default router;
