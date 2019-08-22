import express from 'express';

import verification from '../../../middlewares/verification';

import getLaws from './services/getLaws';
import saveLaw from './services/saveLaw';
import editLaw from './services/editLaw';
import deleteByIds from './services/deleteByIds';
import findLawsByName from './services/findLawsByName';

const router = express.Router();

router.use(verification);

router.route('/all')
    .get(getLaws);

router.route('/save')
    .post(saveLaw);

router.route('/edit')
    .post(editLaw);

router.route('/delete')
    .post(deleteByIds);

router.route('/find')
    .get(findLawsByName);

export default router;
