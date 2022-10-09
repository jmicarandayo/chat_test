import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const messagesSchema = new Schema({
    conversationId: {
        type: String
    },
    sender: {
        type: String
    },
    text: {
        type: String
    },
}, {timestamps: true})

export default mongoose.model('Message', messagesSchema)