require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./src/routes/auth");
const recipeRoutes = require("./src/routes/recipes");
const communityRoutes = require("./src/routes/communityRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// ⭐ Serve your entire BISK--IT folder (frontend root)
app.use(express.static(path.join(__dirname, "..")));

// Load homepage correctly
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/community", communityRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
