import partnersSlider from '../model';

export default function getSlider (id) {
    return partnersSlider.find({ id });
}
