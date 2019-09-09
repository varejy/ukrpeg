import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Rvv = new Schema({
    id: { type: String, required: true },
    rvv: {
        type: Object,
        required: true
    }
});

export default mongoose.model('Rvv', Rvv);
