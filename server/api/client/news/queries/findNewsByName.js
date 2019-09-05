import News from '../model';

export default function findNewsByName(text) {
    return News.find({
        '$or': [
            {
                texts: {
                    en: {
                        name: { $regex: text, $options: 'i' },
                        shortDescription: { $regex: text, $options: 'i' },
                        description: { $regex: text, $options: 'i' },
                        seoTitle: { $regex: text, $options: 'i' },
                        seoDescription: { $regex: text, $options: 'i' },
                        seoKeywords: { $regex: text, $options: 'i' }
                    },
                    ua: {
                        name: { $regex: text, $options: 'i' },
                        shortDescription: { $regex: text, $options: 'i' },
                        description: { $regex: text, $options: 'i' },
                        seoTitle: { $regex: text, $options: 'i' },
                        seoDescription: { $regex: text, $options: 'i' },
                        seoKeywords: { $regex: text, $options: 'i' }
                    }
                }
            }
        ]
    });
}
