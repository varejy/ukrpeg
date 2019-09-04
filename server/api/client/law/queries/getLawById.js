import Law from '../model';

export default function getProductById (id) {
    return Law.find({ id });
}
