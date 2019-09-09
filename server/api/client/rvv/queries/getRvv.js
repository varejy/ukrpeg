import Rvv from '../model';

export default function getRvv (id) {
    return Rvv.find({ id });
}
