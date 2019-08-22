import pick from '@tinkoff/utils/object/pick';

const VALUES = ['name', 'path', 'id'];

export default function prepareProduct (body) {
    return pick(VALUES, body);
}
