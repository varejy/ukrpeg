import pick from '@tinkoff/utils/object/pick';

const VALUES = [
    'texts',
    'id',
    'path'
];

export default function getUaLawValues (law) {
    return pick(VALUES, law);
}
