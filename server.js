const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "register",
});
const dbUser = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "user",
});

/* Intejar Meherab (Signin/Signup) */

app.post("/register", (req, res) => {
  const sql =
    "INSERT INTO signup (`user_name`,`user_email`,`user_password`,`user_type`,`photo_url`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.type,
    req.body.photo_url,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});
app.post("/login", (req, res) => {
  const sql =
    "SELECT * FROM signup WHERE `user_email`= ? AND `user_password`= ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json("Error Hoyece");
    }
    if (data.length > 0) {
      console.log("data", data);
      return res.json(data);
    } else {
      return res.json("Server Error");
    }
  });
});

app.listen(8081, () => {
  console.log("port is working");
});
