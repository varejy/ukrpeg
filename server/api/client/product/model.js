import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Product = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String },
    files: [{ type: String, required: true }],
    hidden: { type: Boolean, required: true },
    views: { type: Number, required: true },
    date: { type: Number, required: true }
});

export default mongoose.model('Product', Product);
