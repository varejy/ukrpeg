import { OKEY_STATUS_CODE, NOT_FOUND_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';

import getProductById from '../queries/getProductById';
import editProduct from '../queries/editProduct';

import getProductValues from '../utils/getProductValues';

export default function getAvailableProduct (req, res) {
    const { id } = req.query;

    getProductById(id)
        .then(([product]) => {
            if (!product || product.hidden) {
                return res.status(NOT_FOUND_STATUS_CODE).end();
            }

            product.views = (product.views || 0) + 1;

            editProduct(product)
                .then((product) => {
                    res.status(OKEY_STATUS_CODE).send(...getProductValues(product));
                })
                .catch(() => {
                    res.status(SERVER_ERROR_STATUS_CODE).end();
                });
        })
        .catch(() => {
            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
