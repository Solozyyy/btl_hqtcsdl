const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Friend = require('../models/Friend');

// Lấy danh sách bạn
router.get('/:userId', auth, async (req, res) => {
    try {
        const friends = await Friend.getFriendsOfUser(req.params.userId);
        res.json(friends);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get friends' });
    }
});

// Hủy kết bạn
router.delete('/unfriend/:id', auth, async (req, res) => {
    const currentUserId = req.user.userId; // từ auth middleware
    const friendId = parseInt(req.params.id);

    try {
        await Friend.deleteFriend(currentUserId, friendId);
        res.json({ message: 'Unfriended successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to unfriend' });
    }
});

module.exports = router;
