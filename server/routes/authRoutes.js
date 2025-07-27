const express = require("express");
const { register, login } = require("../controllers/authController");
const multer = require("multer");

const router = express.Router();

// Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

router.post("/register", upload.single("documents"), register);
router.post("/login", login);

module.exports = router;