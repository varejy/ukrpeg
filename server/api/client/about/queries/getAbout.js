import mainSlider from '../model';

export default function getAbout (id) {
    return mainSlider.find({ id });
}
