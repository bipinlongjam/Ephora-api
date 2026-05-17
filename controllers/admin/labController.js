const db = require("../../config/db");

// GET ALL LABS
exports.getLabs = (req, res) => {
  db.query("SELECT * FROM labs", (err, result) => {
    res.json(result);
  });
};

// ADD LAB (ADMIN)
exports.addLab = (req, res) => {
  const { name, address } = req.body;

  db.query(
    "INSERT INTO labs (name,address) VALUES (?,?)",
    [name, address],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Lab added");
    }
  );
};