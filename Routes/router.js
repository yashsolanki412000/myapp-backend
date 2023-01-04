const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");

// register data
router.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  conn.query(
    "SELECT * FROM singupuser WHERE email = ?",
    [email],
    (err, result) => {
      if (result.length) {
        res.status(422).json("This data is alredy exist");
      } else {
        conn.query(
          "INSERT INTO singupuser (email,password,username) VALUES(?,?,?)",
          [email, password, username],
          (err, result) => {
            if (result) {
              res.status(201).json(req.body);
              console.log(req.body);
            } else {
              res.status(422).json("please check data");
            }
          }
        );
      }
    }
  );
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (email != null) {
    conn.query(
      "SELECT * FROM singupuser WHERE email= ? AND password= ?",
      [email, password],
      function (err, result) {
        if (err) {
          res.status(422).json("please check data");
        }
        if (result.length > 0) {
          res.status(201).json("ok");
        } else {
          res.status(402).json("please check");
        }
      }
    );
  }
});

// add
router.post("/user", (req, res) => {
  console.log(req.body);
  const { name, age, email, address } = req.body;
  if (!name || !age || !email || !address) {
    res.status(422).json("please fill data");
  }

  try {
    conn.query(
      "SELECT * FROM userdata WHERE email = ?",
      email,
      (err, result) => {
        if (result.length) {
          res.status(422).json("The data is alredy exist");
        } else {
          conn.query(
            "INSERT INTO userdata SET ?",
            { name, email, age, address },
            (err, result) => {
              if (err) {
                console.log("err" + err);
              } else {
                res.status(201).json(req.body);
                console.log(req.body);
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
  console.log(id);
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
      console.log(result, "dwhdjqwdh");
    }
  });
});

// test

router.post("/data", (req, res) => {
  const profile = req.body;
  // conn.query("SELECT * FROM singupuser WHERE email = ?",[email],(err,result)=>{
  //     if(err){
  //         res.status(402).json(err)
  //     }else if (result.length > 0 ){
  //         res.status(201).json(result)
  //     }else{
  //         res.status(422).json("please check data")
  //     }
  // })
  console.log(profile);
});

module.exports = router;
