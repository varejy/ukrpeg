import express from 'express';

import verification from '../../../middlewares/verification';

import getNewsAll from './services/getNewsAll';
import saveNews from './services/saveNews';
import editNews from './services/editNews';
import deleteByIds from './services/deleteByIds';
import updateAvatar from './services/updateAvatar';
import findNewsByName from './services/findNewsByName';

const router = express.Router();

router.use(verification);

router.route('/all')
    .get(getNewsAll);

router.route('/save')
    .post(saveNews);

router.route('/edit')
    .post(editNews);

router.route('/delete-few')
    .post(deleteByIds);

router.route('/update-avatar')
    .post(updateAvatar);

router.route('/find')
    .get(findNewsByName);

export default router;
