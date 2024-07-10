import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const course = mongoose.model("course", schema);