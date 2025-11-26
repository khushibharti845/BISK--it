const express = require("express");
const router = express.Router();
const pool = require("../db");  // PostgreSQL connection

// GET all community posts
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM community_posts ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("GET COMMUNITY ERROR:", err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// POST a new community post
router.post("/", async (req, res) => {
  const { username, content } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO community_posts (username, content) VALUES ($1, $2) RETURNING *",
      [username, content]
    );

    res.json({
      message: "Post added",
      post: result.rows[0]
    });
  } catch (err) {
    console.error("POST COMMUNITY ERROR:", err);
    res.status(500).json({ error: "Failed to add post" });
  }
});

module.exports = router;
