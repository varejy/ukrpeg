import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';
import getRvvQuery from '../queries/getAbout';
import createAbout from '../queries/createAbout';

const ABOUT_ID = 'about_id';

export default function getAbout (req, res) {
    getRvvQuery(ABOUT_ID)
        .then(([about]) => {
            if (!about) {
                return createAbout({ texts: {}, id: ABOUT_ID })
                    .then(about => {
                        res.status(OKEY_STATUS_CODE).send(about.texts);
                    })
                    .catch(() => {
                        res.status(SERVER_ERROR_STATUS_CODE).end();
                    });
            }

            res.status(OKEY_STATUS_CODE).send(about.texts);
        })
        .catch(() => {
            res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
