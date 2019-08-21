import pick from '@tinkoff/utils/object/pick';

const VALUES = ['name', 'categoryId', 'hidden', 'id'];

export default function prepareNews (body) {
    return pick(VALUES, body);
}
