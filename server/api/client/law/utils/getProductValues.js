import pick from '@tinkoff/utils/object/pick';

const VALUES = [
    'texts',
    'id',
    'path'
];

export default function getCategoryValues (law) {
    return pick(VALUES, law);
}
