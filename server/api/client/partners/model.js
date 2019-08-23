import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const partnersSlider = new Schema({
    id: { type: String, required: true },
    slides: [{
        path: { type: String, required: true },
        title: { type: String },
        description: { type: String },
        url: { type: String },
        target: { type: Boolean }
    }]
});

export default mongoose.model('partnersSlider', partnersSlider);
