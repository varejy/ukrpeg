import mainSlider from '../model';

export default function updateRvv (rvv) {
    return mainSlider.findOneAndUpdate({ id: rvv.id }, rvv, { new: true });
}
