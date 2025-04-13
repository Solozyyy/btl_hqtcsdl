khởi động tất cả replica set
Lưu ý: Không phải máy nào cũng giống nhau nên tự tìm cách mà setup (không quá khó đâu)

-- 
"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" ^
 --replSet "rs0" ^
 --port 27017 ^
 --dbpath D:\mongodb\data\r1 ^
 --logpath D:\mongodb\log\r1.log ^
 --bind_ip localhost
--
![image](https://github.com/user-attachments/assets/562600fc-88a6-440f-8d80-c26a54d8a440)


--
"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" ^
 --replSet "rs0" ^
 --port 27018 ^
 --dbpath D:\mongodb\data\r2 ^
 --logpath D:\mongodb\log\r2.log ^
 --bind_ip localhost
--
![image](https://github.com/user-attachments/assets/25976d2e-7783-45f7-93a1-829d97167418)


--
"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" ^
 --replSet "rs0" ^
 --port 27019 ^
 --dbpath D:\mongodb\data\r3 ^
 --logpath D:\mongodb\log\r3.log ^
 --bind_ip localhost
--
![image](https://github.com/user-attachments/assets/65aa2667-874c-4fde-bfe1-ebebab83dbff)


Mở mongosh và chạy lệnh này để bật server:

--
D:\mongoDB\mongosh-2.3.9-win32-x64\mongosh-2.3.9-win32-x64\bin\mongosh.exe
--
![image](https://github.com/user-attachments/assets/ac003d1e-35c3-4fb9-8887-d4e71cecf5fd)


