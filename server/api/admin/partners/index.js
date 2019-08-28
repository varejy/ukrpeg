import express from 'express';

import verification from '../../../middlewares/verification';

import updatePartners from './services/updatePartners';

const router = express.Router();

router.use(verification);

router.route('/update-slides')
    .post(updatePartners);

export default router;
