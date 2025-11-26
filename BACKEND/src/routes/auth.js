const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await pool.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email`,
      [name, email, hashed]
    );
    res.json(user.rows[0]);
  } catch (err) {
    res.status(400).json({ error: "Email already exists" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  const user = result.rows[0];
  if (!user) return res.status(401).json({ error: "Invalid email or password" });

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ error: "Invalid email or password" });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
});

module.exports = router;
