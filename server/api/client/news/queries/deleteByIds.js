import News from '../model';

export default function deleteByIds (ids) {
    return News.deleteMany({ id: { $in: ids } });
}
