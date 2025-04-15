const { sql, poolPromise } = require('../database/sqlserver');

// Tạo người dùng mới
const createUser = async (username, password, email) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .input('password', sql.VarChar, password)
            .input('email', sql.VarChar, email)
            .query(`
                INSERT INTO Users (User_name, Password, Email) 
                VALUES (@username, @password, @email)
            `);
        return result;
    } catch (err) {
        throw err;
    }
};

// Lấy người dùng theo username
const getUserByUsername = async (username) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .query(`SELECT * FROM Users WHERE User_name = @username`);
        return result.recordset[0]; // Trả về 1 user
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createUser,
    getUserByUsername
};
