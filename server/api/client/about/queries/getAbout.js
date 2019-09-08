import About from '../model';

export default function getSlider (id) {
    return About.find({ id });
}
