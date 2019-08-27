import News from '../model';

export default function getNewsByIds (ids) {
    return News.find({ id: { $in: ids } });
}
