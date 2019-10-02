import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';

import prepareLaw from '../utils/prepareLaw';

import editLawQuery from '../../../client/uaLaw/queries/editLaw';

export default function editProduct (req, res) {
    const product = prepareLaw(req.body);

    editLawQuery(product)
        .then(law => {
            res.status(OKEY_STATUS_CODE).send(law);
        })
        .catch(() => {
            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
