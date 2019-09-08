import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';
import getSliderQuery from '../queries/getAbout';
import createSlider from '../queries/createAbout';

const ABOUT_ID = 'about_id';

export default function getSlides (req, res) {
    getSliderQuery(ABOUT_ID)
        .then(([about]) => {
            if (!about) {
                return createSlider({ about: [], id: ABOUT_ID })
                    .then(about => {
                        res.status(OKEY_STATUS_CODE).send(about.about);
                    })
                    .catch(() => {
                        res.status(SERVER_ERROR_STATUS_CODE).end();
                    });
            }

            res.status(OKEY_STATUS_CODE).send(about.about);
        })
        .catch(() => {
            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
