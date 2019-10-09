import fs from 'fs';

import {
    SLIDER_FILE_FIELD_NAME_REGEX,
    SLIDER_ADDITIONAL_FILE_FIELD_NAME_REGEX,
    OKEY_STATUS_CODE,
    SERVER_ERROR_STATUS_CODE
} from '../../../../constants/constants';
import updateSlider from '../../../client/slides/queries/updateSlides';
import multipart from '../../../../helpers/multipart';

import noop from '@tinkoff/utils/function/noop';

const SLIDER_ID = 'slider_id';

const uploader = multipart(SLIDER_FILE_FIELD_NAME_REGEX, SLIDER_ADDITIONAL_FILE_FIELD_NAME_REGEX);

export default function updateSlides (req, res) {
    uploader(req, res, (err) => {
        const files = req.files;
        const slider = JSON.parse(req.body.slider);
        const removedSlides = JSON.parse(req.body.removedSlides);

        if (err) {
            return res.status(SERVER_ERROR_STATUS_CODE).end();
        }

        const outdatedSlidesPath = [];
        const resultSlides = slider.map((slide) => {
            if (slide.removedFiles) {
                outdatedSlidesPath.push(...slide.removedFiles);
            }

            return {
                texts: slide.texts,
                photo: slide.photo,
                additionalPhoto: slide.additionalPhoto
            };
        });

        files.forEach(file => {
            if (file.fieldname.match(SLIDER_FILE_FIELD_NAME_REGEX)) {
                const index = file.fieldname.replace(SLIDER_FILE_FIELD_NAME_REGEX, '');

                resultSlides[index].photo = `/${file.path.replace(/\\/g, '/')}`;
            } else if (file.fieldname.match(SLIDER_ADDITIONAL_FILE_FIELD_NAME_REGEX)) {
                const index = file.fieldname.replace(SLIDER_ADDITIONAL_FILE_FIELD_NAME_REGEX, '');

                resultSlides[index].additionalPhoto = `/${file.path.replace(/\\/g, '/')}`;
            }
        });

        removedSlides.forEach(slide => {
            fs.unlink(slide.slice(1), noop);
        });

        outdatedSlidesPath.forEach(path => {
            fs.unlink(path.slice(1), noop);
        });

        updateSlider({ slides: resultSlides, id: SLIDER_ID })
            .then(slider => {
                res.status(OKEY_STATUS_CODE).send(slider.slides);
            })
            .catch(() => {
                resultSlides.forEach(slide => {
                    fs.unlink(slide.photo && slide.photo.slice(1), noop);
                });

                return res.status(SERVER_ERROR_STATUS_CODE).end();
            });
    });
}
