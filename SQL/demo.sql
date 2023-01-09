SELECT * FROM singupuser WHERE email = "yash@gmail.com"; 
INSERT INTO singupuser (email,password,username) VALUES(?,?,?)
SELECT * FROM singupuser WHERE email= ? AND password= ?
SELECT * FROM userdata WHERE email = ?
DELETE FROM userdata WHERE id = ?
UPDATE userdata SET ? WHERE id = ?
SELECT * FROM userdata WHERE id = ?
<<<<<<< HEAD

CREATE TABLE post (id INIT(auto),description longtext,title VARCHAR(500),image longtext ,status(boolean),user_id NUMBER(),slug ,FOREIGN KEY(user_id) REFERENCES singupuser(id) );
=======
ALTER TABLE singupuser
ADD address varchar(255) city varchar(255);
>>>>>>> 6af1cc9e96d11abcfcbe0fcb190e19cd37b628e2
