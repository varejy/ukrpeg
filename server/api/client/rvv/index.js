import express from 'express';

import getRvv from './services/getRvv';

const router = express.Router();

router.route('/')
    .get(getRvv);

export default router;
