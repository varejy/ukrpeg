import News from '../model';

export default function getAllNews () {
    return News.find({});
}
