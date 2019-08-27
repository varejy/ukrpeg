export default function getProduct (body) {
    const { texts, id, path } = body;

    return {
        texts,
        path,
        id
    };
}
