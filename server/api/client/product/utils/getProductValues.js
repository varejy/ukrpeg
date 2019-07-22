import pick from '@tinkoff/utils/object/pick';

const VALUES = [
    'name',
    'id',
    'date',
    'views',
    'avatar',
    'files'
];

export default function getProductValues (product) {
    return pick(VALUES, product);
}
