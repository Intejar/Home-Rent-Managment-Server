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
s  