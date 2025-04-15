﻿-- Tạo bảng Users
create database chatty;
use chatty;

CREATE TABLE Users (
    User_id INT PRIMARY KEY IDENTITY(1,1), -- Không cần insert tự tăng
    User_name NVARCHAR(50) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Created_at DATETIME default getdate() -- Không cần insert tự tăng
);

-- Tạo bảng Friend_requests
CREATE TABLE Friend_requests (
    Request_id INT PRIMARY KEY Identity(1,1), -- Không cần insert tự tăng
    Sender_id INT NOT NULL,
    Receiver_id INT NOT NULL,
    Request_time DATETIME default getdate(), -- Không cần insert tự tăng
    Status VARCHAR(20) NOT NULL default('PENDING'), -- Không cần insert tự động điền
    FOREIGN KEY (Sender_id) REFERENCES Users(User_id),
    FOREIGN KEY (Receiver_id) REFERENCES Users(User_id)
);

-- Tạo bảng Friends (mối quan hệ N-N giữa Users)
CREATE TABLE Friends (
    Friend_id1 INT NOT NULL,
    Friend_id2 INT NOT NULL,
    Added_at DATETIME default getdate(), -- Không cần insert tự tăng
    PRIMARY KEY (Friend_id1, Friend_id2),
    FOREIGN KEY (Friend_id1) REFERENCES Users(User_id),
    FOREIGN KEY (Friend_id2) REFERENCES Users(User_id)
);

