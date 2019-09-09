import fs from 'fs';

import { RVV_FILE_FIELD_NAME_REGEX, OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';
import updateSlider from '../../../client/rvv/queries/updateRvv';
import multipart from '../../../../helpers/multipart';

import noop from '@tinkoff/utils/function/noop';

const RVV_ID = 'rvv_id';

const uploader = multipart(RVV_FILE_FIELD_NAME_REGEX);

export default function updateRvv (req, res) {
    uploader(req, res, (err) => {
        if (err) {
            return res.status(SERVER_ERROR_STATUS_CODE).end();
        }

        const files = req.files;
        const rvv = JSON.parse(req.body.rvv);
        const removedSlides = JSON.parse(req.body.removedSlides);
        const outdatedSlidesPath = [];
        const resultSlides = {
            ...rvv,
            why: rvv.why.map((slide) => {
                if (slide.removedFile) {
                    outdatedSlidesPath.push(slide.removedFile);
                }

                return {
                    texts: slide.texts,
                    alt: slide.alt,
                    path: slide.path
                };
            })
        };

        files.forEach(file => {
            const index = file.fieldname.replace(RVV_FILE_FIELD_NAME_REGEX, '');

            resultSlides.why[index].path = `/${file.path.replace(/\\/g, '/')}`;
        });

        removedSlides.forEach(slide => {
            fs.unlink(slide.slice(1), noop);
        });

        outdatedSlidesPath.forEach(path => {
            fs.unlink(path.slice(1), noop);
        });

        updateSlider({ rvv: resultSlides, id: RVV_ID })
            .then(slider => {
                res.status(OKEY_STATUS_CODE).send(slider.rvv);
            })
            .catch(() => {
                resultSlides.why.forEach(slide => {
                    fs.unlink(slide.path && slide.path.slice(1), noop);
                });

                return res.status(SERVER_ERROR_STATUS_CODE).end();
            });
    });
}
