import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const slider = new Schema({
    id: { type: String, required: true },
    slides: [{
        texts: { type: Object, required: true },
        photo: { type: String },
        additionalPhoto: { type: String }
    }]
});

export default mongoose.model('Slider', slider);
