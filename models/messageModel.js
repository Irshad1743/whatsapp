const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        trim: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    readBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;