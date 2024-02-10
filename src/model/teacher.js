import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    username: String,
    familiya: String,
    email: String,
    password: String,
    kocha: String,
    uy: String,
    image: String,
    jsh: String,
    tugilgan_sana: String,
    otasini_ismi: String,
    yonalish_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Yonalish',
    },
    jinsi: Boolean,
    raqam: String,
    izoh: String,
});

const Teacher = mongoose.model('teacher', teacherSchema);
export default Teacher
