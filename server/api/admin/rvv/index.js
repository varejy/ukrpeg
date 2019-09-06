import express from 'express';

import verification from '../../../middlewares/verification';

import updateRvv from './services/updateRvv';

const router = express.Router();

router.use(verification);

router.route('/update')
    .post(updateRvv);

export default router;
