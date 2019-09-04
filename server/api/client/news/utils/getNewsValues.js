import pick from '@tinkoff/utils/object/pick';

const VALUES = [
    'id',
    'date',
    'avatar',
    'categoryId',
    'hidden',
    'views',
    'texts'
];

export default function getNewsValues (news) {
    return pick(VALUES, news);
}
