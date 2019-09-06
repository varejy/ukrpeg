import rvv from '../model';

export default function updateRvv (rvv) {
    return rvv.findOneAndUpdate({ id: rvv.id }, rvv, { new: true });
}
