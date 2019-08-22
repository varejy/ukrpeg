import pick from '@tinkoff/utils/object/pick';

const VALUES = ['name', 'hidden', 'id', 'positionIndex'];

export default function prepareCategory (body) {
    return pick(VALUES, body);
}
