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

--
"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" ^
 --replSet "rs0" ^
 --port 27018 ^
 --dbpath D:\mongodb\data\r2 ^
 --logpath D:\mongodb\log\r2.log ^
 --bind_ip localhost
--

--
"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" ^
 --replSet "rs0" ^
 --port 27019 ^
 --dbpath D:\mongodb\data\r3 ^
 --logpath D:\mongodb\log\r3.log ^
 --bind_ip localhost
--

Mở mongosh và chạy lệnh này để bật server:

--
"D:\mongoDB\mongosh-2.3.9-win32-x64\mongosh.exe" --port 27017
--

