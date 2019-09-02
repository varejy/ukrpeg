import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';

import getAllLaws from '../../../client/law/queries/getAllLaws';

export default function getLaws (req, res) {
    getAllLaws()
        .then(laws => {
            res.status(OKEY_STATUS_CODE).send(laws);
        })
        .catch(() => {
            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
