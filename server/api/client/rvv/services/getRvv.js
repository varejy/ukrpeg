import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';
import getRvvQuery from '../queries/getRvv';
import createRvv from '../queries/createRvv';

const RVV_ID = 'rvv_id';

export default function getRvv (req, res) {
    getRvvQuery(RVV_ID)
        .then(([rvv]) => {
            if (!rvv) {
                return createRvv({ texts: {}, id: RVV_ID })
                    .then(rvv => {
                        res.status(OKEY_STATUS_CODE).send(rvv.texts);
                    })
                    .catch(() => {
                        res.status(SERVER_ERROR_STATUS_CODE).end();
                    });
            }

            res.status(OKEY_STATUS_CODE).send(rvv);
        })
        .catch(() => {
            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
