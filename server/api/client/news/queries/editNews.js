import News from '../model';

export default function editNews (news) {
    return News.findOneAndUpdate({ id: news.id }, news, { new: true });
}
