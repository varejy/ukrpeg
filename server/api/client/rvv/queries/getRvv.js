import mainSlider from '../model';

export default function getRvv (id) {
    return mainSlider.find({ id });
}
