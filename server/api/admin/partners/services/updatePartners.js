import fs from 'fs';

import { PARTNER_FILE_FIELD_NAME_REGEX, OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';
import updateSlider from '../../../client/partners/queries/updatePartner';
import multipart from '../../../../helpers/multipart';

import noop from '@tinkoff/utils/function/noop';

const SLIDER_ID = 'partners_id';

const uploader = multipart(PARTNER_FILE_FIELD_NAME_REGEX);

export default function updatePartners (req, res) {
    uploader(req, res, (err) => {
        if (err) {
            return res.status(SERVER_ERROR_STATUS_CODE).end();
        }

        const files = req.files;
        const partners = JSON.parse(req.body.partners);
        const removedSlides = JSON.parse(req.body.removedSlides);
        const outdatedSlidesPath = [];
        const resultSlides = partners.map((slide) => {
            if (slide.removedFile) {
                outdatedSlidesPath.push(slide.removedFile);
            }

            return {
                name: slide.name,
                path: slide.path
            };
        });

        files.forEach(file => {
            const index = file.fieldname.replace(PARTNER_FILE_FIELD_NAME_REGEX, '');

            resultSlides[index].path = `/${file.path.replace(/\\/g, '/')}`;
        });

        removedSlides.forEach(slide => {
            fs.unlink(slide.slice(1), noop);
        });

        outdatedSlidesPath.forEach(path => {
            fs.unlink(path.slice(1), noop);
        });

        updateSlider({ partners: resultSlides, id: SLIDER_ID })
            .then(slider => {
                res.status(OKEY_STATUS_CODE).send(slider.partners);
            })
            .catch(() => {
                resultSlides.forEach(slide => {
                    fs.unlink(slide.path && slide.path.slice(1), noop);
                });

                return res.status(SERVER_ERROR_STATUS_CODE).end();
            });
    });
}
