import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Category = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    hidden: { type: Boolean, required: true },
    positionIndex: { type: Number, required: true }
});

export default mongoose.model('Category', Category);
