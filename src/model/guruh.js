import mongoose from "mongoose";

const GuruhSchema = new mongoose.Schema({
    title: String,
    sequence: Number,
    kun: String,
    soat: String,
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Guruh = mongoose.model('guruh', GuruhSchema);
export default Guruh;
