import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Seo = new Schema({
    name: { type: String, required: true, unique: true },
    texts: {
        type: {
            metaKeywords: { type: String, required: true },
            metaTitle: { type: String, required: true },
            metaDescription: { type: String, required: true }
        },
        required: true
    }
});

export default mongoose.model('Seo', Seo);
