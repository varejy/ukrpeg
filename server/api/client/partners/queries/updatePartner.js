import Partners from '../model';

export default function updateSlider (slider) {
    return Partners.findOneAndUpdate({ id: slider.id }, slider, { new: true });
}
