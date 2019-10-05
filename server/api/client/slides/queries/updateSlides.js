import mainSlider from '../model';

export default function updateSlides (about) {
    return mainSlider.findOneAndUpdate({ id: about.id }, about, { new: true });
}
