import uniqid from 'uniqid';

import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';

import prepareProduct from '../utils/prepareLaw';

import saveLawQuery from '../../../client/uaLaw/queries/saveLaw';

export default function saveLaw (req, res) {
    const law = prepareProduct(req.body);
    const id = uniqid();

    saveLawQuery({ ...law, id })
        .then(law => {
            res.status(OKEY_STATUS_CODE).send(law);
        })
        .catch(() => {
            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
