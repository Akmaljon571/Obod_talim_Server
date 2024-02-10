import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    desc: String,
    send_id: String,
    status: {
        type: String,
        enum: ['teacher', 'student'],
        required: true,
    },
});

const Message = mongoose.model('message', MessageSchema);
export default Message;
