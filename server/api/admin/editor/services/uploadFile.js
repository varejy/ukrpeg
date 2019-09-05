import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE, EDITOR_FILE_NAME_REGEX } from '../../../../constants/constants';

import multipart from '../../../../helpers/multipart';

const uploader = multipart(EDITOR_FILE_NAME_REGEX);

export default function uploadFile (req, res) {
    uploader(req, res, (err) => {
        if (err) {
            return res.status(SERVER_ERROR_STATUS_CODE).end();
        }

        res.status(OKEY_STATUS_CODE).end();
    });
}
