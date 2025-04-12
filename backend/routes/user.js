const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Lấy danh sách tất cả người dùng
router.get("/", authMiddleware, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
});

// Tạo mới người dùng
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: "Thêm người dùng thành công!", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
});

// Cập nhật thông tin người dùng
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID không hợp lệ" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, password },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Không tìm thấy user" });
        }

        res.status(200).json({ message: "Cập nhật thành công", user: updatedUser });

    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
});

// Xóa người dùng
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID không hợp lệ" });
        }

        const deleteUser = await User.findByIdAndDelete(id);

        if (!deleteUser) {
            return res.status(404).json({ message: "ID không tồn tại" });
        }

        res.status(200).json({ message: "Xóa thành công user", user: deleteUser });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
});

module.exports = router;
