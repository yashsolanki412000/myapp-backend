SELECT * FROM singupuser WHERE email = "yash@gmail.com"; 
INSERT INTO singupuser (email,password,username) VALUES(?,?,?)
SELECT * FROM singupuser WHERE email= ? AND password= ?
SELECT * FROM userdata WHERE email = ?
DELETE FROM userdata WHERE id = ?
UPDATE userdata SET ? WHERE id = ?
SELECT * FROM userdata WHERE id = ?

CREATE TABLE post (id INIT(auto),description longtext,title VARCHAR(500),image longtext ,status(boolean),user_id NUMBER(),slug ,FOREIGN KEY(user_id) REFERENCES singupuser(id) );
ALTER TABLE singupuser
ADD address varchar(255) city varchar(255);


SELECT post.id AS id, post.desc AS description,post.title AS title,post.image AS image, post.slug AS slug,singupuser.email AS email,singupuser.username AS username,singupuser.images AS profileimage 
    From post 
    INNER JOIN singupuser 
    ON post.user_id = singupuser.id 
