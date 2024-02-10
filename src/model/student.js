import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    username: String,
    familiya: String,
    email: String,
    kocha: String,
    uy: String,
    image: String,
    jsh: String,
    tugilgan_sana: String,
    otasini_ismi: String,
    jinsi: Boolean,
    raqam: String,
    guruh_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'guruh',
    },
    holati: {
        type: String,
        enum: ['oqimoqda', 'ketgan', 'tamomladi'],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Student = mongoose.model('student', studentSchema);
export default Student
