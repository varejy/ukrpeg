import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const News = new Schema({
    id: { type: String, required: true },
    categoryId: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String },
    hidden: { type: Boolean, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    views: { type: Number, required: true },
    date: { type: String, required: true }
});

export default mongoose.model('News', News);
