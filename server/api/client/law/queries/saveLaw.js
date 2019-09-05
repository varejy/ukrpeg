import Law from '../model';

export default function saveProduct (product) {
    return Law.create(product);
}
