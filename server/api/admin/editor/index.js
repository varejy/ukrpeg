import express from 'express';

import verification from '../../../middlewares/verification';

import uploadFile from './services/uploadFile';

const router = express.Router();

router.use(verification);

router.route('/file')
    .post(uploadFile);

export default router;
