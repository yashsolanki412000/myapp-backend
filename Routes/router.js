const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "secretKey";
const nodemailer = require("nodemailer");

// register data
router.post("/register", async function (req, res) {
  const salt = bcrypt.genSalt(10);
  const { username, email, password } = req.body;
  const test = await bcrypt.hash(password, parseInt(salt));

  // console.log(test)

  conn.query(
    "SELECT * FROM singupuser WHERE email = ?",
    [email],
    (err, result) => {
      if (result.length) {
        res.status(422).json("This data is alredy exist");
      } else {
        conn.query(
          "INSERT INTO singupuser (email,password,username) VALUES(?,?,?)",
          [email, test, username],
          (err, result) => {
            if (result) {
              res.status(201).json(req.body);
            } else {
              res.status(422).json("please check data");
            }
          }
        );
      }
    }
  );
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email != null) {
    conn.query(
      "SELECT * FROM singupuser WHERE email= ?",
      [email],
      async function (err, result) {
        if (err) {
          res.status(422).json("please check this email is already exist");
        }
        if (result.length > 0) {
          const passwordCompare = await bcrypt.compare(
            password,
            result[0].password
          );
          if (passwordCompare) {
            jwt.sign(
              { email, id: result[0].id },
              secretKey,
              { expiresIn: "300s" },
              (err, token) => {
                return res.json({
                  data: result,
                  token,
                });
              }
            );
          } else {
            return res.status(500).json({
              message: "Password didnt match",
            });
          }
        } else {
          return res.status(402).json("please check");
        }
      }
    );
  }
});

// add
router.post("/user", (req, res) => {
  const { name, age, email, address } = req.body;
  if (!name || !age || !email || !address) {
    res.status(422).json("please fill data");
  }

  try {
    conn.query(
      "SELECT * FROM userdata WHERE email = ?",
      email,
      (err, result) => {
        if (result) {
          res.status(422).json("The data is alredy exist");
        } else {
          conn.query(
            "INSERT INTO userdata SET ?",
            { name, email, age, address },
            (err, result) => {
              if (err) {
              } else {
                res.status(201).json(req.body);
              }
            }
          );
        }
      }
    );
  } catch (error) {
    res.status(422).json(error);
  }
});
// get users

router.get("/getusers", (req, res) => {
  conn.query("SELECT * FROM userdata", (err, result) => {
    if (err) {
      res.status(422).json("no data available");
    } else {
      res.status(401).json(result);
    }
  });
});

// delete users

router.delete("/deleteuser/:id", (req, res) => {
  const { id } = req.params;
  conn.query("DELETE FROM userdata WHERE id = ?", id, (err, result) => {
    if (err) {
      res.status(422).json("error");
    } else {
      res.status(201).json(result);
    }
  });
});

// update users
router.patch("/updateuser/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  conn.query(
    "UPDATE userdata SET ? WHERE id = ?",
    [data, id],
    (err, result) => {
      if (err) {
        res.status(422).json("error");
      } else {
        res.status(201).json(result);
      }
    }
  );
});

// view user
router.get("/getusers/:id", (req, res) => {
  const { id } = req.params;
  conn.query("SELECT * FROM userdata WHERE id = ?", id, (err, result) => {
    if (err) {
      res.status(422).json("error");
    } else {
      res.status(201).json(result);
    }
  });
});

// get users- address and age
router.get("/get-user", (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ");
    const decodeData = jwt.decode(token[1]);
    conn.query(
      "SELECT * FROM singupuser WHERE id = ?",
      [decodeData.id],
      (err, result) => {
        if (result) {
          return res.status(200).json({
            message: "ok",
            data: result,
          });
        } else {
          throw new Error(`no data found or some error occured`);
        }
      }
    );
  }
});
//post userdetails

router.post("/userdetailes", (req, res) => {
  const { desc, title, status, userid, slug, image } = req.body;
  conn.query(
    "INSERT INTO post(`desc`,`title`,`status`,`user_id`,`slug`,`image`) VALUES(?,?,?,?,?,?)",
    [desc, title, status, userid, slug, image],
    (err, result) => {
      if (err) {
        res.status(500).json("please check");
      } else {
        res.status(200).json(req.body);
      }
    }
  );
});

// put address and city

router.put("/updateuser/:id", (req, res) => {
  const { id } = req.params;
  const { address, city,images } = req.body;

  conn.query(
    "UPDATE singupuser SET  address=?,city=?,images=? WHERE id = ?",
    [address, city,images, id],
    (err, result) => {
      if (err) {
        res.status(422).json("error");
      } else {
        res.status(201).json(req.body);
      }
    }
  );
});

// // test

// router.post("/data", verifyToken, (req, res) => {});

// function verifyToken(req, res, next) {
//   const bearerHeader = req.headers["uthorization"];
//   if (typeof bearerHeader !== undefined) {
//   } else {
//     return res.status(500).json({
//       message: "not a bearer token",
//     });
//   }
// }

// two tables combine data

router.get("/newuserdata",(req,res)=>{
conn.query("SELECT post.id AS id, post.desc AS description,post.title AS title,post.image AS image, post.slug AS slug,singupuser.email AS email,singupuser.username AS username,singupuser.images AS profileimage From post INNER JOIN singupuser ON post.user_id = singupuser.id",(err,result)=>{
  if(err){
   return res.status(500).json("something went wrong")
  }else{
    return res.status(200).json(result)
  }
})  
})
router.get("/getpostdata/:slug",(req,res)=>{
  const {slug} = req.params
  conn.query("SELECT post.id AS id, post.desc AS description,post.title AS title,post.image AS image, post.slug AS slug,singupuser.email AS email,singupuser.username AS username,singupuser.images AS profileimage From post INNER JOIN singupuser ON post.user_id = singupuser.id WHERE slug =?",slug,(err,result)=>{
    if(err){
      return res.status(500).json("somthing went wrong")
    }else{
      return res.status(200).json(result)
    }
  })
})

router.post("/userdetailes",(req,res)=>{
  const  {desc,title,status,userid,slug,image} = req.body
 conn.query( "INSERT INTO post(`desc`,`title`,`status`,`user_id`,`slug`,`image`) VALUES(?,?,?,?,?,?)",[desc,title,status,userid,slug,image],(err,result)=>{
  if(err){
    res.status(500).json("please check")
  }else{
    res.status(200).json(req.body)
  }
 })
})

// router.delete("/deletepost/:slug", (req, res) => {
//   const { slug } = req.params;
//   conn.query("DELETE FROM post WHERE slug = ?", slug, (err, result) => {
//     if (err) {
//        res.status(422).json("error");
//     } else {
//        res.status(201).json(result);
//     }
//   });
// });
router.post("/commentpost",(req,res)=>{
  const {message,userid,postid,status} = req.body
  conn.query("INSERT INTO postcomment(`message`,`user_id`,`status`,`post_id`) VALUES(?,?,?,?)",[message,userid,status,postid],(err,result)=>{
    if(err){
      res.status(500).json(err)
    }else{
      res.status(200).json(req.body)
    }
  })
})
router.delete("/deletecomment/:id",(req,res)=>{
  const {id} = req.params
 conn.query("DELETE FROM postcomment WHERE post_id = ?",[id],(err,result)=>{
  if(err){
    res.status(422).json(err)
  }else{
    conn.query("DELETE FROM post WHERE id = ?",[id],(err1,result1)=>{
      if(err1){
        res.status(422).json(err1)
      }else{
        res.status(200).json(result1)
      }
    })
  }
 })
 // get comment message
})

router.get("/getcomment/:id",(req,res)=>{
  const {id} = req.params
  const message = req.body
  if(!message){
    res.status(402).json("no comments")
  }else{
  conn.query("SELECT * FROM postcomment WHERE post_id = ?",[id],(err,result)=>{
    if(err){
      res.status(422).json(err)
    }else{
      res.status(200).json(result)
    }
  })
  }
 })
 router.get("/usercomment/:id",(req,res)=>{
  const {id} = req.params
  conn.query("SELECT postcomment.message AS message, singupuser.email AS email, singupuser.username AS username From postcomment INNER JOIN singupuser ON postcomment.user_id = singupuser.id WHERE postcomment.post_id = ?",id,(err,result)=>{
    if(err){
      res.status(422).json(err)
    }else{
      res.status(200).json(result)
    }
  })
 })
 router.post("/userlike",(req,res)=>{
  
  const {likes,status,postid,userid} = req.body
  conn.query("INSERT INTO postlike(`likes`,`status`,`user_id`,`post_id`) VALUES(?,?,?,?)",[likes,status,userid,postid],(err,result)=>{
    if(err){
      return res.status(402).json(err)
    }else{
      return res.status(200).json(result)
    }
  })
 })

 router.post("/likecount",(req,res)=>{
  
  const {postid} = req.body
  conn.query("SELECT COUNT(*) as count FROM `postlike` WHERE post_id = ? AND likes = true",[postid],(err,result)=>{
    if(err){
      return res.status(402).json(err)
    }else{
      return res.status(200).json(result)
    }
  })
 })

 router.post("/dislike",(req,res)=>{
  const {userid,postid} = req.body
  console.log(req.body)
  conn.query("SELECT * FROM `postlike` WHERE user_id = ? AND post_id = ?",[userid,postid],(err,result)=>{
    console.log(err,result)
    if(err){
      return res.status(402).json(err)
    }else{
      return res.status(402).json(result)
    }
  })
 })

 router.put("/updatelike",(req,res)=>{
  const {userid,postid,likes} = req.body
  console.log(req.body)
  conn.query("SELECT * FROM postlike WHERE user_id AND post_id AND likes = true",[userid,postid,likes],(err,result)=>{
    if(result){
      conn.query("UPDATE postlike SET  likes = false",[likes],(error,result1)=>{
        if(result1){
          return res.status(200).json("false")
        }else{
          return res.status(402).json("true")
        }
      })
    }
  })
 })
 router.post("/sendmail",(req,res)=>{
  let {test} = req.body
  console.log(test)
  let testAccount = nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'eloy.jenkins12@ethereal.email',
      pass: 'xvEh9BnADb9Gkg1Br7'
    },
  } ); 
  let info = transporter.sendMail({
    from: '"solanki yash 👻" <solankiyash1914@gmail.com>', // sender address
    to: "harshil.iflair@gmail.com ", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<div>
    ${test}
    </div>
    `,
  })
 })
 
 
module.exports = router;
