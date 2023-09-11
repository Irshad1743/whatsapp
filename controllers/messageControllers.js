const Message = require("../models/messageModel");

//send message
exports.sendMessage = async (req, res) => {
    try {
        const {content, reciever} = req.body;
        const sender = req.userData;

        const data = Message({ content, sender, reciever });
        const result = await data.save();
        res.status(201).json({ message: "Message sent successfully" });
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
}

//get user message
exports.getUserMessage = async (req, res) => {
    try {
        const {sender, reciever} = req.body;
        // const result = await Message.find({ 
        //     $and: 
        //     [ 
        //         {sender: {$in: [sender, reciever] } },
        //         {reciever: {$in: [sender, reciever] } } 
        //     ]
        // }, {content: 1, sender: 1});

        const result = await Message.find({
            $or: [
              { sender: sender, reciever: reciever },
              { sender: reciever, reciever: sender }
            ]
          }, {content: 1, sender: 1}).sort({ createdAt: 1 });
          


        // const result = await Message.find({ 
        //     sender: sender, reciever: reciever
        // }, {content: 1, sender: 1});
        res.status(201).json({ message: result });
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
}