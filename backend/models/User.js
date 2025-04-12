const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true }
});

const User = mongoose.model('User', userSchema);
// tạo 1 model trong schema trong mongoDB
//User bây giờ là một class, có thể được dùng để thực hiện các 
//thao tác với MongoDB như tạo, đọc, cập nhật, xóa (CRUD)

module.exports = User;
// dòng này xuất module để tái sử dụng ở file khác trong project
