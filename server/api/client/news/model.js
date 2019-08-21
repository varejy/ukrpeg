import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const News = new Schema({
    id: { type: String, required: true },
    categoryId: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String },
    hidden: { type: Boolean, required: false },
    description: { type: String, required: false },
    date: { type: Number, required: false }
});

export default mongoose.model('News', News);
