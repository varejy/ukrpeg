import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const rvv = new Schema({
    id: { type: String, required: true },
    texts: {
        type: {
            plans: [{
                type: String,
                required: true
            }],
            why: [
                {
                    type: {
                        text: {
                            type: String,
                            required: true
                        },
                        img: {
                            type: String,
                            required: true
                        }
                    },
                    required: true
                }
            ]
        },
        required: true
    }
});

export default mongoose.model('rvv', rvv);
