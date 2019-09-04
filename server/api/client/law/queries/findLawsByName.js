import Law from '../model';

export default function findProductsByName (text) {
    return Law.find({ '$or': [
        { name: { $regex: text, $options: 'i' } }
    ]
    });
}
