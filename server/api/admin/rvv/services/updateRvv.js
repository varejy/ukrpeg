import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';
import updateSlider from '../../../client/rvv/queries/updateRvv';

const RVV_ID = 'rvv_id';

export default function updateRvv (req, res) {
    const { info } = req.body;

    updateSlider({ info, id: RVV_ID })
        .then(rvv => {
            res.status(OKEY_STATUS_CODE).send(rvv.info);
        })
        .catch(() => {
            return res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
