export default function getNews (body) {
    const { name, description, shortDescription, categoryId, hidden, avatar, views, id, date } = body;

    return {
        name,
        id,
        date,
        avatar,
        categoryId,
        description,
        hidden,
        views,
        shortDescription
    };
}
