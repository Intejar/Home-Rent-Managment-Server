
/* Azmain Ibn Kausar (Tenant Part) */
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
    console.log('v',values);
    dbUser.query(sql, [values], (err, data) => {
      if (err) {
        return res.json("Error");
      }
      return res.json(data);
    });
  });