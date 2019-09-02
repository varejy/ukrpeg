import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';

import findLawsByNameQuery from '../../../client/law/queries/findLawsByName';

export default function findProductsByName (req, res) {
    const { text } = req.query;

    findLawsByNameQuery(text)
        .then(laws => {
            res.status(OKEY_STATUS_CODE).send(laws);
        })
        .catch(() => {
            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
