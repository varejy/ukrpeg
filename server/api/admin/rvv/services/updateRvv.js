import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';
import updateRvvQuery from '../../../client/rvv/queries/updateRvv';

const RVV_ID = 'rvv_id';

export default function updateRvv (req, res) {
    const { texts } = req.body;

    console.log(texts)

    updateRvvQuery({ texts, id: RVV_ID })
        .then(rvv => {
            res.status(OKEY_STATUS_CODE).send(rvv.texts);
        })
        .catch(() => {
            return res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
