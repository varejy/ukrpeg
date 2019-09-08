import pick from '@tinkoff/utils/object/pick';

const VALUES = [
    'id',
    'date',
    'avatar',
    'alias',
    'categoryId',
    'hidden',
    'views',
    'texts'
];

export default function prepareNews (body) {
    return pick(VALUES, body);
}
