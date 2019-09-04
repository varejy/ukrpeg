import Law from '../model';

export default function editProduct (product) {
    return Law.findOneAndUpdate({ id: product.id }, product, { new: true });
}
