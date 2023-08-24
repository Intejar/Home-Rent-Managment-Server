app.post("/updateDeal", (req, res) => {
    const sql = `UPDATE deal SET payment_status = ? WHERE apartment_id = ?`;
    const values = [req.body.status, req.body.id];
    console.log(values);
    dbUser.query(sql, [req.body.status, req.body.id], (err, data) => {
      if (err) {
        return res.json("Error");
      }
      return res.json(data);
    });
  });
  app.post("/updateAdminMsg", (req, res) => {
    const sql = `UPDATE adminmsg SET status = ? WHERE apartment_id = ?`;
    const values = [req.body.status, req.body.id];
    console.log(values);
    dbUser.query(sql, [req.body.status, req.body.id], (err, data) => {
      if (err) {
        return res.json("Error");
      }
      return res.json(data);
    });
  });
  