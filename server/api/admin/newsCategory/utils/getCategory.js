export default function getCategory (body) {
    const { name, hidden, id, positionIndex } = body;

    return { name, hidden, id, positionIndex };
}
