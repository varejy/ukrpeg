import fs from 'fs';
import { OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE, NEWS_AVATAR_FIELD_NAME_REGEX } from '../../../../constants/constants';

import editNews from '../../../client/news/queries/editNews';
import getNewsById from '../../../client/news/queries/getNewsById';

import multipart from '../../../../helpers/multipart';

import noop from '@tinkoff/utils/function/noop';

const uploader = multipart(NEWS_AVATAR_FIELD_NAME_REGEX);

export default function updateAvatar (req, res) {
    const { id } = req.query;

    getNewsById(id)
        .then(([news]) => {
            uploader(req, res, (err) => {
                if (err) {
                    return res.status(SERVER_ERROR_STATUS_CODE).end();
                }

                news.avatar && fs.unlink(news.avatar.slice(1), noop);

                const files = req.files;
                const avatar = `/${files[0].path.replace(/\\/g, '/')}`;

                editNews({ avatar, id })
                    .then(news => {
                        res.status(OKEY_STATUS_CODE).send(news);
                    })
                    .catch(() => {
                        fs.unlink(avatar.slice(1), noop);

                        return res.status(SERVER_ERROR_STATUS_CODE).end();
                    });
            });
        })
        .catch(() => {
            return res.status(SERVER_ERROR_STATUS_CODE).end();
        });
}
