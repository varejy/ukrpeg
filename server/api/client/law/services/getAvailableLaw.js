import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';

import getLawById from '../queries/getLawById';
import editLaw from '../queries/editLaw';

import getProductValues from '../utils/getProductValues';

export default function getAvailableLaw (req, res) {
    const { id } = req.query;

    getLawById(id)
        .then(([law]) => {
            editLaw(law)
                .then((law) => {
                    res.status(OKEY_STATUS_CODE).send(...getProductValues(law));
                })
                .catch(() => {
                    res.status(SERVER_ERROR_STATUS_CODE).end();
                });
        })
        .catch(() => {
            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
