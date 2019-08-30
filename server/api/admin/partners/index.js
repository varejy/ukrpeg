import express from 'express';

import verification from '../../../middlewares/verification';

import updatePartners from './services/updateSlides';

const router = express.Router();

router.use(verification);

router.route('/update-partners')
    .post(updatePartners);

export default router;
