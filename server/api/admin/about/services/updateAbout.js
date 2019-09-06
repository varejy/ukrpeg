import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';
import updateAboutQuery from '../../../client/about/queries/updateAbout';

const RVV_ID = 'rvv_id';

export default function updateAbout (req, res) {
    const { texts } = req.body;

    updateAboutQuery({ texts, id: RVV_ID })
        .then(about => {
            res.status(OKEY_STATUS_CODE).send(about.texts);
        })
        .catch(() => {
            return res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
