import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Law = new Schema({
    id: { type: String, required: true },
    texts: { type: Object, required: true },
    path: { type: String, required: true }
});

export default mongoose.model('Law', Law);
