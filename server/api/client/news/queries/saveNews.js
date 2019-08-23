import News from '../model';

export default function saveNews (news) {
    return News.create(news);
}
