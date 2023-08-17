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

/* Aysha (Landlord Part) */
// app.post("/post", (req, res) => {
//   const sql =
//     "INSERT INTO landlordpost (`apartment_no`,`apartment_area`,`apartment_type`,`photo_url`,`apartment_rent`,`landlord_id`,`landlord_name`,`landlord_email`,`landlord_img`) VALUES (?)";
//   const values = [
//     req.body.houseNo,
//     req.body.area,
//     req.body.type,
//     req.body.photo_url,
//     req.body.rent,
//     req.body.userId,
//     req.body.userName,
//     req.body.userEmail,
//     req.body.userImg,
//   ];
//   dbUser.query(sql, [values], (err, data) => {
//     if (err) {
//       return res.json("Error");
//     }
//     return res.json(data);
//   });
// });

// app.post("/myPost", (req, res) => {
//   const sql =
//     "SELECT * FROM landlordpost WHERE `landlord_email`= ? AND `landlord_name`= ?";
//   dbUser.query(sql, [req.body.email, req.body.name], (err, data) => {
//     if (err) {
//       return res.status(500).json("Error Hoyece");
//     }
//     if (data.length > 0) {
//       return res.status(200).json(data);
//     } else {
//       return res.status(500).json("Server Error");
//     }
//   });
// });

app.listen(8081, () => {
  console.log("port is working");
});
