import Law from '../model';

export default function getAllLaws () {
    return Law.find({});
}
