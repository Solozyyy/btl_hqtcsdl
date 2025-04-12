const express = require("express");
const Message = require("../models/Message");

const router = express.Router();

// 📩 POST: Gửi tin nhắn
router.post('/', async (req, res) => {
    try {
        const { senderId, receiverId, text, image } = req.body;

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image,
        });

        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (err) {
        res.status(500).json({ error: 'Failed to send message', details: err.message });
    }
});

// 📨 GET: Lấy tin nhắn giữa 2 người dùng
router.get('/:user1Id/:user2Id', async (req, res) => {
    const { user1Id, user2Id } = req.params;

    try {
        const messages = await Message.find({
            $or: [
                { senderId: user1Id, receiverId: user2Id },
                { senderId: user2Id, receiverId: user1Id }
            ]
        }).sort({ createdAt: 1 }); // sort theo thời gian tăng dần

        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get messages', details: err.message });
    }
});

module.exports = router;
