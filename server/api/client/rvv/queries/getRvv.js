import rvv from '../model';

export default function getRvv (id) {
    return rvv.find({ id });
}
