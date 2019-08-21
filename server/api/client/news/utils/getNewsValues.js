import pick from '@tinkoff/utils/object/pick';

const VALUES = [
    'name',
    'id',
    'date',
    'avatar',
    'categoryId',
    'description'
];

export default function getNewsValues (news) {
    return pick(VALUES, news);
}
