const express = require("express");
const { poolPromise } = require("../database/sqlserver");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Lấy danh sách tất cả người dùng
router.get("/", authMiddleware, async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM Users");

        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
});

// Tạo mới người dùng
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Thực hiện insert vào bảng Users trong SQL Server
        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', sql.NVarChar(50), username)
            .input('password', sql.NVarChar(255), password)
            .input('email', sql.NVarChar(100), email)
            .query("INSERT INTO Users (User_name, Password, Email) OUTPUT INSERTED.User_id, INSERTED.User_name, INSERTED.Email VALUES (@username, @password, @email)");

        res.status(201).json({ message: "Thêm người dùng thành công!", user: result.recordset[0] });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
});

// Cập nhật thông tin người dùng
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, email } = req.body;

        // Kiểm tra id hợp lệ
        if (!Number(id)) {
            return res.status(400).json({ message: "ID không hợp lệ" });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('username', sql.NVarChar(50), username)
            .input('password', sql.NVarChar(255), password)
            .input('email', sql.NVarChar(100), email)
            .query("UPDATE Users SET User_name = @username, Password = @password, Email = @email WHERE User_id = @id");

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "Không tìm thấy user" });
        }

        res.status(200).json({ message: "Cập nhật thành công" });

    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
});

// Xóa người dùng
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra id hợp lệ
        if (!Number(id)) {
            return res.status(400).json({ message: "ID không hợp lệ" });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query("DELETE FROM Users WHERE User_id = @id");

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "ID không tồn tại" });
        }

        res.status(200).json({ message: "Xóa thành công user" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
});

module.exports = router;
