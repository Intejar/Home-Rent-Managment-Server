app.post("/allDeal", (req, res) => {
    const sql = "SELECT * FROM deal";
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
  app.post("/allReport", (req, res) => {
    const sql = "SELECT * FROM report";
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
  app.post("/deletePost", (req, res) => {
    const sql = `DELETE FROM landlordpost  WHERE apartment_id = ?`;
    const values = [req.body.id];
    console.log(values);
    dbUser.query(sql, [req.body.id], (err, data) => {
      if (err) {
        return res.json("Error");
      }
      return res.json(data);
    });
  });
  app.post("/deleteReport", (req, res) => {
    const sql = `DELETE FROM report  WHERE apartment_id = ?`;
    const values = [req.body.id];
    console.log(values);
    dbUser.query(sql, [req.body.id], (err, data) => {
      if (err) {
        return res.json("Error");
      }
      return res.json(data);
    });
  });
  app.post("/deleteDeal", (req, res) => {
    const sql = `DELETE FROM deal  WHERE apartment_id = ?`;
    const values = [req.body.id];
    console.log(values);
    dbUser.query(sql, [req.body.id], (err, data) => {
      if (err) {
        return res.json("Error");
      }
      return res.json(data);
    });
  });
  
  app.post("/adminMsg", (req, res) => {
    const sql =
      "INSERT INTO adminmsg (`apartment_id`,`apartment_no`,`apartment_area`,`landlord_name`,`landlord_email`,`tenant_name`,`tenant_email`,`rent`,`status`) VALUES (?)";
    const values = [
      req.body.id,
      req.body.houseNo,
      req.body.area,
      req.body.landName,
      req.body.landEmail,
      req.body.userName,
      req.body.userEmail,
      req.body.rent,
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