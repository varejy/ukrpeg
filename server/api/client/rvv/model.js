import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Rvv = new Schema({
    id: { type: String, required: true },
    texts: {
        type: {
            plans: [{
                type: {
                    title: {
                        type: String,
                        required: true
                    }
                },
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
                        },
                        id: {
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
                    type: {
                        title: {
                            type: String,
                            required: true
                        }
                    },
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
                    type: {
                        title: {
                            type: String,
                            required: true
                        }
                    },
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

export default mongoose.model('Rvv', Rvv);
