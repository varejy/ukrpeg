import News from '../model';

export default function getNewsById (id) {
    return News.find({ id });
}
