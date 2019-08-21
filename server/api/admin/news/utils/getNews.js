export default function getNews (body) {
    const { name, description, categoryId, hidden, id, date } = body;

    return {
        name,
        description,
        categoryId,
        hidden,
        date,
        id
    };
}
