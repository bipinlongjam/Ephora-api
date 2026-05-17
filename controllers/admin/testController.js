const db = require("../../config/db");

// GET TESTS BY LAB
exports.getTestsByLab = (req, res) => {
  const { lab_id } = req.params;

  db.query(
    "SELECT * FROM tests WHERE lab_id=?",
    [lab_id],
    (err, result) => {
      res.json(result);
    }
  );
};

// ADD TEST
exports.addTest = (req, res) => {
  const { lab_id, name, price } = req.body;

  db.query(
    "INSERT INTO tests (lab_id,name,price) VALUES (?,?,?)",
    [lab_id, name, price],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Test added");
    }
  );
};