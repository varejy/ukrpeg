import uniqid from 'uniqid';

import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';

import prepareProduct from '../utils/prepareLaw';

import saveProductQuery from '../../../client/law/queries/saveLaw';

export default function saveProduct (req, res) {
    const product = prepareProduct(req.body);
    const id = uniqid();
    const path = `/laws/${product.path}`;

    saveProductQuery({ ...product, path, id })
        .then(product => {
            res.status(OKEY_STATUS_CODE).send(product);
        })
        .catch(() => {
            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
