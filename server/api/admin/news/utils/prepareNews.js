import pick from '@tinkoff/utils/object/pick';

const VALUES = [
    'name',
    'id',
    'date',
    'avatar',
    'categoryId',
    'description',
    'hidden',
    'views',
    'shortDescription'
];

export default function prepareNews (body) {
    return pick(VALUES, body);
}
