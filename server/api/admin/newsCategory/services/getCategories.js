import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';

import getAllCategories from '../../../client/newsCategory/queries/getAllCategories';

export default function getCategories (req, res) {
    getAllCategories()
        .then(categories => {
            const sortableCategories = categories
                .sort((oldCateg, newCateg) => oldCateg.positionIndex - newCateg.positionIndex);

            res.status(OKEY_STATUS_CODE).send(sortableCategories);
        })
        .catch(() => {
            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
