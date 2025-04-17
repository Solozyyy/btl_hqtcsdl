const express = require('express');
const router = express.Router();
const FriendRequest = require('../models/FriendRequest');
const authMiddleware = require("../middleware/auth");
const Friend = require('../models/Friend');

// Gửi lời mời kết bạn
router.post('/send', authMiddleware, async (req, res) => {
    const { senderId, receiverId } = req.body;
    try {
        const result = await FriendRequest.createRequest(senderId, receiverId);
        res.status(201).json({ message: 'Friend request sent!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to send friend request' });
    }
});

// Chấp nhận hoặc từ chối
router.put('/update/:id', authMiddleware, async (req, res) => {
    const { status } = req.body; // 'ACCEPTED' hoặc 'REJECTED'
    const requestId = parseInt(req.params.id);

    try {
        // Lấy thông tin request để xử lý
        console.log('Updating request ID:', requestId);
        const requests = await FriendRequest.getRequestById(requestId);
        console.log('Fetched request:', requests);
        const request = requests[0];

        if (!request) {
            return res.status(404).json({ error: 'Friend request not found' });
        }

        if (status === 'ACCEPTED') {
            // Tạo bạn bè
            await Friend.addFriend(request.Sender_id, request.Receiver_id);
            // Cập nhật trạng thái
            await FriendRequest.updateStatus(requestId, 'ACCEPTED');
            res.json({ message: 'Friend request accepted and friendship created' });
        } else if (status === 'REJECTED') {
            // Xoá lời mời kết bạn
            await FriendRequest.deleteRequest(requestId);
            res.json({ message: 'Friend request rejected and deleted' });
        } else {
            res.status(400).json({ error: 'Invalid status' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update request status' });
    }
});

// Xem tất cả lời mời đã nhận
router.get('/received/:userId', authMiddleware, async (req, res) => {
    try {
        const requests = await FriendRequest.getReceivedRequests(req.params.userId);
        res.json(requests);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch requests' });
    }
});

module.exports = router;
