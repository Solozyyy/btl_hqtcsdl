const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Đăng ký
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Kiểm tra username đã tồn tại chưa
        let user = await User.findOne({ username });
        if (user) return res.status(400).json({ message: "Username đã tồn tại!" });

        // Mã hóa mật khẩu
        const salted_salmon = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salted_salmon);

        // Tạo user mới
        user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "Đăng ký thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server" });
    }
});

// Đăng nhập
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Kiểm tra user tồn tại
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "Sai username hoặc mật khẩu!" });

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Sai username hoặc mật khẩu!" });

        // Tạo JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ token, user: { id: user._id, username: user.username } });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server" });
    }
});

module.exports = router;
