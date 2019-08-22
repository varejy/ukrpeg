import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';

import getAllLaws from '../../../client/law/queries/getAllLaws';
import deleteByIdsQuery from '../../../client/law/queries/deleteByIds';

export default function deleteByIds (req, res) {
    const { ids } = req.body;

    deleteByIdsQuery(ids)
        .then(() => {
            getAllLaws()
                .then(products => {
                    res.status(OKEY_STATUS_CODE).send(products);
                });
        })
        .catch(() => {
            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
