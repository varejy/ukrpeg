export default function getNews (body) {
    const { categoryId, hidden, avatar, views, id, date, texts } = body;

    return {
        id,
        date,
        avatar,
        categoryId,
        hidden,
        views,
        texts
    };
}
