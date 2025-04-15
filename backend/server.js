require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
// db.js
const sql = require('mssql');

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message.route.js");
const emailRoutes = require("./routes/email.route.js");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/email", emailRoutes);

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ Kết nối MongoDB thành công!"))
    .catch(err => console.log(err));

//config connect to sql server
const sqlConfig = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER || 'localhost',
    database: process.env.SQL_DATABASE || 'chatty',
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};

sql.connect(sqlConfig)
    .then(pool => {
        if (pool.connected) {
            console.log("✅ Kết nối SQL Server thành công!");
        }
    })
    .catch(err => {
        console.error("❌ Lỗi kết nối SQL Server:", err);
    });

//chay server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server chạy trên cổng ${PORT}`));