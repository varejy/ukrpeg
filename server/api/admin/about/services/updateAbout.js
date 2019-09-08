import fs from 'fs';

import { ABOUT_FILE_FIELD_NAME_REGEX, OKEY_STATUS_CODE, SERVER_ERROR_STATUS_CODE } from '../../../../constants/constants';
import updateSlider from '../../../client/about/queries/updateAbout';
import multipart from '../../../../helpers/multipart';

import noop from '@tinkoff/utils/function/noop';

const ABOUT_ID = 'about_id';

const uploader = multipart(ABOUT_FILE_FIELD_NAME_REGEX);

export default function updateAbout (req, res) {
    uploader(req, res, (err) => {
        if (err) {
            return res.status(SERVER_ERROR_STATUS_CODE).end();
        }

        const files = req.files;
        const about = JSON.parse(req.body.about);
        const removedSlides = JSON.parse(req.body.removedSlides);
        const outdatedSlidesPath = [];
        const resultSlides = about.map((slide) => {
            if (slide.removedFile) {
                outdatedSlidesPath.push(slide.removedFile);
            }

            return {
                texts: slide.texts,
                path: slide.path
            };
        });

        files.forEach(file => {
            const index = file.fieldname.replace(ABOUT_FILE_FIELD_NAME_REGEX, '');

            resultSlides[index].path = `/${file.path.replace(/\\/g, '/')}`;
        });

        removedSlides.forEach(slide => {
            fs.unlink(slide.slice(1), noop);
        });

        outdatedSlidesPath.forEach(path => {
            fs.unlink(path.slice(1), noop);
        });

        updateSlider({ about: resultSlides, id: ABOUT_ID })
            .then(slider => {
                res.status(OKEY_STATUS_CODE).send(slider.about);
            })
            .catch(() => {
                resultSlides.forEach(slide => {
                    fs.unlink(slide.path && slide.path.slice(1), noop);
                });

                return res.status(SERVER_ERROR_STATUS_CODE).end();
            });
    });
}
