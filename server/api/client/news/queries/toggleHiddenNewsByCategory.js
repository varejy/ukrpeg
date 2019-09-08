import News from '../model';

export default function toggleHiddenNewsByCategory (categoryId, hidden) {
    return News.updateMany({ categoryId: categoryId }, { hidden });
}
