SELECT * FROM singupuser WHERE email = "yash@gmail.com"; 
INSERT INTO singupuser (email,password,username) VALUES(?,?,?)
SELECT * FROM singupuser WHERE email= ? AND password= ?
SELECT * FROM userdata WHERE email = ?
DELETE FROM userdata WHERE id = ?
UPDATE userdata SET ? WHERE id = ?
SELECT * FROM userdata WHERE id = ?
ALTER TABLE singupuser
ADD address varchar(255) city varchar(255);