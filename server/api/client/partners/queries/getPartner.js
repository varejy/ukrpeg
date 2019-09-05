import Partners from '../model';

export default function getSlider (id) {
    return Partners.find({ id });
}
