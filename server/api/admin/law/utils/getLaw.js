export default function getProduct (body) {
    const { name, id, path } = body;

    return {
        name,
        path,
        id
    };
}
