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
const dbDeal = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "deal",
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

/* Suraiya (Landlord Part) */
app.post("/post", (req, res) => {
  const sql =
    "INSERT INTO landlordpost (`apartment_no`,`apartment_area`,`apartment_type`,`photo_url`,`apartment_rent`,`landlord_id`,`landlord_name`,`landlord_email`,`landlord_img`) VALUES (?)";
  const values = [
    req.body.houseNo,
    req.body.area,
    req.body.type,
    req.body.photo_url,
    req.body.rent,
    req.body.userId,
    req.body.userName,
    req.body.userEmail,
    req.body.userImg,
  ];
  dbUser.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.post("/myPost", (req, res) => {
  const sql =
    "SELECT * FROM landlordpost WHERE `landlord_email`= ? AND `landlord_name`= ?";
  dbUser.query(sql, [req.body.email, req.body.name], (err, data) => {
    if (err) {
      return res.status(500).json("Error Hoyece");
    }
    if (data.length > 0) {
      return res.status(200).json(data);
    } else {
      return res.status(500).json("Server Error");
    }
  });
});
// Deal-->
app.post("/myTenant", (req, res) => {
  const sql =
    "SELECT * FROM deal WHERE `landlord_email`= ? AND `landlord_name`= ?";
  dbUser.query(sql, [req.body.email, req.body.name], (err, data) => {
    if (err) {
      return res.status(500).json("Error Hoyece");
    }
    if (data.length > 0) {
      return res.status(200).json(data);
    } else {
      return res.status(500).json("Server Error");
    }
  });
});

/* Navid (Tenant Part) */
app.post("/allPost", (req, res) => {
  const sql = "SELECT * FROM landlordpost ";
  dbUser.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json("Error Hoyece");
    }
    if (data.length > 0) {
      return res.status(200).json(data);
    } else {
      return res.status(500).json("Server Error");
    }
  });
});
// Filter-->
app.post("/filterPost", (req, res) => {
  const sql = "SELECT * FROM landlordpost WHERE `apartment_area`= ?";
  dbUser.query(sql, [req.body.area], (err, data) => {
    if (err) {
      return res.status(500).json("Error Hoyece");
    }
    if (data.length > 0) {
      console.log(data);
      return res.status(200).json(data);
    } else {
      return res.status(500).json("Server Error");
    }
  });
});

// Deal-->
app.post("/dealLet", (req, res) => {
  const sql =
    "INSERT INTO deal (`apartment_id`,`apartment_no`,`apartment_area`,`apartment_rent`,`landlord_name`,`landlord_email`,`tenant_name`,`tenant_email`,`payment_status`) VALUES (?)";
  const values = [
    req.body.id,
    req.body.houseNo,
    req.body.area,
    req.body.rent,
    req.body.landName,
    req.body.landEmail,
    req.body.userName,
    req.body.userEmail,
    req.body.status,
  ];
  console.log(values);
  dbUser.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});
app.post("/myDeal", (req, res) => {
  const sql = "SELECT * FROM deal WHERE `tenant_email`= ? AND `tenant_name`= ?";
  dbUser.query(sql, [req.body.email, req.body.name], (err, data) => {
    if (err) {
      return res.status(500).json("Error Hoyece");
    }
    if (data.length > 0) {
      return res.status(200).json(data);
    } else {
      return res.status(500).json("Server Error");
    }
  });
});

// Report-->
app.post("/report", (req, res) => {
  const sql =
    "INSERT INTO report (`apartment_id`,`landlord_name`,`landlord_email`,`tenant_name`,`tenant_email`) VALUES (?)";
  const values = [
    req.body.id,
    req.body.landName,
    req.body.landEmail,
    req.body.userName,
    req.body.userEmail,
  ];
  console.log(values);
  dbUser.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.listen(8081, () => {
  console.log("port is working");
});
