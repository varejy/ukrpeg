import pick from '@tinkoff/utils/object/pick';

const VALUES = [
    'id',
    'avatar',
    'alias',
    'categoryId',
    'hidden',
    'views',
    'texts',
    'date'
];

export default function prepareNews (body) {
    return pick(VALUES, body);
}
