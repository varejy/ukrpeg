import mainSlider from '../model';

export default function updateAbout (about) {
    return mainSlider.findOneAndUpdate({ id: about.id }, about, { new: true });
}
