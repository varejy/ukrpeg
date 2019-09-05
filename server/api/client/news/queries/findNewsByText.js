import News from '../model';

export default function findNewsByText (text) {
    return News.find({ '$or': [
        { 'texts.ua.name': { $regex: text, $options: 'i' } },
        { 'texts.en.name': { $regex: text, $options: 'i' } },
        { 'texts.ua.shortDescription': { $regex: text, $options: 'i' } },
        { 'texts.en.shortDescription': { $regex: text, $options: 'i' } },
        { 'texts.ua.description': { $regex: text, $options: 'i' } },
        { 'texts.en.description': { $regex: text, $options: 'i' } }
    ] });
}