import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';
import getSliderQuery from '../queries/getPartner';
import createSlider from '../queries/createPartner';

const SLIDER_ID = 'partners_id';

export default function getSlides (req, res) {
    getSliderQuery(SLIDER_ID)
        .then(([partners]) => {
            if (!partners) {
                return createSlider({ partners: [], id: SLIDER_ID })
                    .then(partners => {
                        res.status(OKEY_STATUS_CODE).send(partners.partners);
                    })
                    .catch(() => {
                        res.status(SERVER_ERROR_STATUS_CODE).end();
                    });
            }

            res.status(OKEY_STATUS_CODE).send(partners.partners);
        })
        .catch(() => {
            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
