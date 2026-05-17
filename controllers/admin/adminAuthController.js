const db = require("../../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ✅ CREATE ADMIN
exports.createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  // basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // check if admin already exists
    db.query(
      "SELECT * FROM admin WHERE email=?",
      [email],
      async (err, result) => {
        if (err) return res.status(500).send(err);

        if (result.length > 0) {
          return res.status(400).json({ message: "Admin already exists" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // insert admin
        db.query(
          "INSERT INTO admin (name, email, password) VALUES (?, ?, ?)",
          [name, email, hashedPassword],
          (err, insertResult) => {
            if (err) return res.status(500).send(err);

            res.status(201).json({
              message: "Admin created successfully",
              adminId: insertResult.insertId
            });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



// ✅ ADMIN LOGIN
exports.loginAdmin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  db.query(
    "SELECT * FROM admin WHERE email=?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).send(err);

      if (result.length === 0) {
        return res.status(400).json({ message: "Admin not found" });
      }

      const admin = result[0];

      // compare password
      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }

      // generate token
      const token = jwt.sign(
        {
          id: admin.id,
          role: "admin"
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        message: "Login successful",
        token,
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email
        }
      });
    }
  );
};