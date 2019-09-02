import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';

import getLawsByIds from '../queries/getLawsByIds';

export default function getAvailableProductsByIds (req, res) {
    const ids = req.body;

    getLawsByIds(ids)
        .then(laws => {
            res.status(OKEY_STATUS_CODE).send(laws);
        })
        .catch(() => {
            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
