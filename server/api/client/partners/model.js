import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Partners = new Schema({
    id: { type: String, required: true },
    partners: [{
        path: { type: String, required: true },
        name: { type: String, required: true }
    }]
});

export default mongoose.model('Partners', Partners);
