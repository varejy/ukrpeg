import express from 'express';

import verification from '../../../middlewares/verification';

import updateAbout from './services/updateAbout';

const router = express.Router();

router.use(verification);

router.route('/update')
    .post(updateAbout);

export default router;
