import Law from '../model';

export default function nullifyCategories (ids) {
    return Law.find({ id: { $in: ids } });
}
