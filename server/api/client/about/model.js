import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const about = new Schema({
    id: { type: String, required: true },
    about: [{
        texts: { type: Object, required: true },
        contentType: { type: String, required: true },
        video: { type: String },
        photo: { type: String }
    }]
});

export default mongoose.model('About', about);
