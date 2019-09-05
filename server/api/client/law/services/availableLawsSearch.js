import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';

import findLawssByName from '../queries/findLawsByName';

export default function availableLawsSearch (req, res) {
    const { text } = req.query;

    findLawssByName(text)
        .then(laws => {
            res.status(OKEY_STATUS_CODE).send(laws);
        })
        .catch(() => {
            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
