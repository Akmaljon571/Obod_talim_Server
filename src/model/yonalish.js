import mongoose from "mongoose";

const yonalishSchema = new mongoose.Schema({
    title: String,
})

const Yonalish = mongoose.model('yonalish', yonalishSchema);
export default Yonalish
