import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';

import getAllLaws from '../../../client/uaLaw/queries/getAllLaws';
import deleteByIdsQuery from '../../../client/uaLaw/queries/deleteByIds';

export default function deleteByIds (req, res) {
    const { ids } = req.body;

    deleteByIdsQuery(ids)
        .then(() => {
            getAllLaws()
                .then(laws => {
                    res.status(OKEY_STATUS_CODE).send(laws);
                });
        })
        .catch(() => {
            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
