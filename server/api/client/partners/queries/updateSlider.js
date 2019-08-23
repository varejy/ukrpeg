import partnersSlider from '../model';

export default function updateSlider (slider) {
    return partnersSlider.findOneAndUpdate({ id: slider.id }, slider, { new: true });
}
