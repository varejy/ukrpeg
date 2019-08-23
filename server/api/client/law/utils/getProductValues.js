import pick from '@tinkoff/utils/object/pick';

const VALUES = [
    'name',
    'id',
    'path'
];

export default function getCategoryValues (law) {
    return pick(VALUES, law);
}
