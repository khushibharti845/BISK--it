const router = require("express").Router();
const pool = require("../db");
const auth = require("../middleware/authMiddleware");

// Get all recipes
router.get("/", async (req, res) => {
  const recipes = await pool.query("SELECT * FROM recipes ORDER BY id DESC");
  res.json(recipes.rows);
});

// Add recipe (protected)
router.post("/", auth, async (req, res) => {
  const { title, description, ingredients, steps } = req.body;
  const result = await pool.query(
    `INSERT INTO recipes (title, description, ingredients, steps, author_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [title, description, ingredients, steps, req.user.id]
  );

  res.json(result.rows[0]);
});

module.exports = router;
