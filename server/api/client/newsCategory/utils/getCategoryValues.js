import pick from '@tinkoff/utils/object/pick';

const VALUES = [
    'name',
    'id',
    'hidden'
];

export default function getCategoryValues (category) {
    return pick(VALUES, category);
}
