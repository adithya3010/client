const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { role, email, password } = req.body;

    const validRoles = ["user", "admin", "hr", "doctor"];
    if (!validRoles.includes(role)) return res.status(400).json({ error: "Invalid role" });

    const existingUser = await User.findOne({ email, role});
    if(!existingUser) return res.status(400).json({ error: "User already exists with this email and role" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ ...req.body, password: hashedPassword, documents: req.file?.filename });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, role });
    if (!user) return res.status(400).json({ message: "Invalid credentials (or) role not matched" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};