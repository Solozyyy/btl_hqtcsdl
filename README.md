khởi động tất cả replica set
Lưu ý: Không phải máy nào cũng giống nhau nên tự tìm cách mà setup (không quá khó đâu)


"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" ^
 --replSet "rs0" ^
 --port 27017 ^
 --dbpath D:\mongodb\data\r1 ^
 --logpath D:\mongodb\log\r1.log ^
 --bind_ip localhost
--
![image](https://github.com/user-attachments/assets/562600fc-88a6-440f-8d80-c26a54d8a440)



"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" ^
 --replSet "rs0" ^
 --port 27018 ^
 --dbpath D:\mongodb\data\r2 ^
 --logpath D:\mongodb\log\r2.log ^
 --bind_ip localhost
--
![image](https://github.com/user-attachments/assets/25976d2e-7783-45f7-93a1-829d97167418)



"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" ^
 --replSet "rs0" ^
 --port 27019 ^
 --dbpath D:\mongodb\data\r3 ^
 --logpath D:\mongodb\log\r3.log ^
 --bind_ip localhost
--
![image](https://github.com/user-attachments/assets/65aa2667-874c-4fde-bfe1-ebebab83dbff)


Mở mongosh và chạy lệnh này để bật server:


mongosh "mongodb://localhost:27017,localhost:27018,localhost:27019/?replicaSet=rs0"
--
![image](https://github.com/user-attachments/assets/ac003d1e-35c3-4fb9-8887-d4e71cecf5fd)

Muốn xem dữ liệu trong mongoDB Compass thì tạo connection với URI


mongodb://localhost:27017,localhost:27018,localhost:27019/?replicaSet=rs0
--

![image](https://github.com/user-attachments/assets/8beaab59-9ded-46b5-ba81-0aa64bc8b1aa)

Diagram trong sql server

![image](https://github.com/user-attachments/assets/d213b18e-aee1-4499-b5a4-175b9e4002fd)


