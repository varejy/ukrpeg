import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';

import getAllLaws from '../queries/getAllLaws';

export default function getAvailableLaws (req, res) {
    getAllLaws()
        .then(laws => {
            const availableLaws = laws
                .filter(law => !law.hidden);

            res.status(OKEY_STATUS_CODE).send(availableLaws);
        })
        .catch(() => {
            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
