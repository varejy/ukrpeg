import express from 'express';

import getAbout from './services/getSlides';

const router = express.Router();

router.route('/')
    .get(getAbout);

export default router;
