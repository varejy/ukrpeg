import pick from '@tinkoff/utils/object/pick';

const VALUES = [
    'name',
    'id',
    'path'
];

export default function getProductValues (product) {
    return pick(VALUES, product);
}
