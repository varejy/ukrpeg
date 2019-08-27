import News from '../model';

export default function findNewsByName (text) {
    return News.find({ '$or': [
        { name: { $regex: text, $options: 'i' } },
        { description: { $regex: text, $options: 'i' } }
    ]
    });
}
