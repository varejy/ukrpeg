import Law from '../model';

export default function deleteByIds (ids) {
    return Law.deleteMany({ id: { $in: ids } });
}
