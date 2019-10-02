import pick from '@tinkoff/utils/object/pick';

const VALUES = [
    'texts',
    'id',
    'path'
];

export default function getEuroLawValues (law) {
    return pick(VALUES, law);
}
