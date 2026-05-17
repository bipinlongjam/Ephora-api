const router = require("express").Router();
const {
  createAdmin,
  loginAdmin
} = require("../../controllers/admin/adminAuthController");

// create admin
router.post("/create", createAdmin);

// login admin
router.post("/login", loginAdmin);

module.exports = router;