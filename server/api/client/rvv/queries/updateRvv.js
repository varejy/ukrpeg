import Rvv from '../model';

export default function updateRvv (rvv) {
    return Rvv.findOneAndUpdate({ id: rvv.id }, rvv, { new: true });
}
