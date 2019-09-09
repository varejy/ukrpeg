import Laws from '../../law/model';

export default function findNewsByText (text) {
    return Laws.find({ '$or': [
        { 'texts.ua.name': { $regex: text, $options: 'i' } },
        { 'texts.en.name': { $regex: text, $options: 'i' } }
    ] });
}
