import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const about = new Schema({
    id: { type: String, required: true },
    about: [{
        texts: { type: Object, required: true },
        path: { type: String, required: true }
    }]
});

export default mongoose.model('About', about);
