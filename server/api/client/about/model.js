import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const about = new Schema({
    id: { type: String, required: true },
    texts: {
        type: [
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
        ],
        required: true
    }
});

export default mongoose.model('about', about);
