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
                        imgAlt: {
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
            pProject: {
                type: {
                    sity: {
                        type: String,
                        required: true
                    },
                    description: {
                        type: String,
                        required: true
                    }
                },
                required: true
            },
            mainForces: [
                {
                    type: String,
                    required: true
                }
            ],
            keyFacts: [
                {
                    type: {
                        title: {
                            type: String,
                            required: true
                        },
                        description: {
                            type: String,
                            required: true
                        }
                    },
                    required: true
                }
            ],
            composition: [
                {
                    type: String,
                    required: true
                }
            ],
            message: {
                    type: String,
                    required: true
            }
        },
        required: true
    }
});

export default mongoose.model('rvv', rvv);
