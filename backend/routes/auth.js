const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sql, poolPromise } = require("../database/sqlserver");

const router = express.Router();

// Đăng ký
router.post("/register", async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const pool = await poolPromise;

        // Kiểm tra username đã tồn tại chưa
        const existing = await pool.request()
            .input('username', sql.NVarChar(50), username)
            .query("SELECT * FROM Users WHERE User_name = @username");

        if (existing.recordset.length > 0) {
            return res.status(400).json({ message: "Username đã tồn tại!" });
        }

        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Thêm user mới vào database
        const insertResult = await pool.request()
            .input('username', sql.NVarChar(50), username)
            .input('password', sql.VarChar(255), hashedPassword)
            .input('email', sql.NVarChar(100), email)
            .query("INSERT INTO Users (User_name, Password, Email) OUTPUT INSERTED.User_id, INSERTED.User_name, INSERTED.Email VALUES (@username, @password, @email)");

        const newUser = insertResult.recordset[0];

        res.status(201).json({ message: "Đăng ký thành công!", user: newUser });
    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
});

// Đăng nhập
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const pool = await poolPromise;

        // Tìm user theo username
        const result = await pool.request()
            .input('username', sql.NVarChar(50), username)
            .query("SELECT * FROM Users WHERE User_name = @username");

        const user = result.recordset[0];
        if (!user) {
            return res.status(400).json({ message: "Sai username hoặc mật khẩu!" });
        }

        // So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ message: "Sai username hoặc mật khẩu!" });
        }

        // Tạo token
        const token = jwt.sign({ id: user.User_id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({
            token,
            user: {
                id: user.User_id,
                username: user.User_name,
                email: user.Email
            }
        });
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
});

module.exports = router;
