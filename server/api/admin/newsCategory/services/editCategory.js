import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';

import prepareCategory from '../utils/prepareCategory';

import editCategoryQuery from '../../../client/newsCategory/queries/editCategory';

export default function editCategory (req, res) {
    const category = prepareCategory(req.body);

    editCategoryQuery(category)
        .then(category => {
            res.status(OKEY_STATUS_CODE).send(category);
        })
        .catch(() => {
            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
