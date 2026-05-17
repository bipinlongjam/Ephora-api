const router = require("express").Router();
const { verifyToken } = require("../../middleware/authMiddleware");
const { isAdmin } = require("../../middleware/adminMiddleware");

const testController = require("../../controllers/admin/testController");

router.use(verifyToken, isAdmin);

router.post("/", testController.addTest);

module.exports = router;